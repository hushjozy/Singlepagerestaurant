import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { Link } from "react-router-dom";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div></div>;
}

function RenderComments({comments, addComment, dishId}) {
  if (comments != null) {
    return (
      <div className="col-12 col-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <li key={comments.id}>
            <p>{comments.comment}</p>
            <p>
              -- {comments.author} ,{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comments.date)))}
            </p>
          </li>
          );
          <CommentForm dishId={dishId} addComment={addComment} />
        </ul>
      </div>
    );
  }
}
const Dishdetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-12 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col col-md-12 m-1">
          <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmitComment(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    // event.preventDefault();
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };
  render() {
    return (
      <div>
        <div className="ml-auto">
          <Button outline onClick={this.toggleModal}>
            <span className="fas fa-comment fa-lg"></span> Submit Comment
          </Button>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
              <Row className="form-group">
                <strong>
                  {" "}
                  <Label htmlFor="Rating" md={1}>
                    Rating
                  </Label>
                </strong>
                <Col md={{ size: 12, offset: 0 }}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <strong>
                  {" "}
                  <Label htmlFor="author" md={{ offset: 2 }}>
                    Your Name
                  </Label>
                </strong>
                <Col md={{ size: 12, offset: 0 }}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: " Must be greater than 2 characters",
                      maxLength: " Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <strong>
                  {" "}
                  <Label htmlFor="comment" md={2}>
                    Comment
                  </Label>
                </strong>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    rows="6"
                    name="comment"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Dishdetail;
