import React, { Component } from "react";
import axios from "axios";

import AddEditContent from "./EditAddContent";

export default class CreateToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_title: "",
      todo_description: "",
      todo_completed: false,
      todo_titleValidatnMsg: "",
      todo_descriptionValidatnMsg: ""
    };
    this.onChangeTodotitle = this.onChangeTodotitle.bind(this);
    this.onChangeTododescription = this.onChangeTododescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setValue = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  onChangeTodotitle = e => {
    this.setValue("todo_title", e.target.value);
  };

  onChangeTododescription = e => {
    this.setValue("todo_description", e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();
    const that = this;
    // console.log(`Form submitted:`);
    // console.log(`Todo title: ${this.state.todo_title}`);
    // console.log(`Todo description: ${this.state.todo_description}`);

    const { todo_title, todo_description, todo_completed } = this.state;

    const newTodo = {
      todo_title: todo_title,
      todo_description: todo_description,
      todo_completed: todo_completed
    };

    axios
      .post("http://localhost:3001/todos/add", newTodo)
      .then(function(res) {
        // console.log(res);
        that.setState({
          todo_title: "",
          todo_description: "",
          todo_completed: false,
          todo_titleValidatnMsg: "",
          todo_descriptionValidatnMsg: ""
        });
      })
      .catch(function(err) {
        // console.log(err);
        const errors = err.response.data.errors;
        if (errors) {
          let errorObj = {};

          if (
            errors.todo_title &&
            errors.todo_title.name === "ValidatorError"
          ) {
            errorObj.todo_titleValidatnMsg = errors.todo_title.kind;
          } else {
            errorObj.todo_titleValidatnMsg = "";
          }

          if (
            errors.todo_description &&
            errors.todo_description.name === "ValidatorError"
          ) {
            errorObj.todo_descriptionValidatnMsg = errors.todo_description.kind;
          } else {
            errorObj.todo_descriptionValidatnMsg = "";
          }
          that.setState(errorObj);
        } else {
          that.setState({
            todo_title: "",
            todo_description: "",
            todo_completed: false,
            todo_titleValidatnMsg: "",
            todo_descriptionValidatnMsg: ""
          });
        }
      })
      .then(function() {
        // always executed
      });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>New Todo</h3>

        <form onSubmit={this.onSubmit}>
          <AddEditContent
            todo_title={this.state.todo_title}
            onChangeTodotitle={this.onChangeTodotitle}
            todo_description={this.state.todo_description}
            onChangeTododescription={this.onChangeTododescription}
            todo_titleValidatnMsg={this.state.todo_titleValidatnMsg}
            todo_descriptionValidatnMsg={this.state.todo_descriptionValidatnMsg}
          >
            <div className="form-group">
              <input
                type="submit"
                value="Create"
                className="btn btn-primary float-right px-4"
              />
            </div>
          </AddEditContent>
        </form>
      </div>
    );
  }
}
