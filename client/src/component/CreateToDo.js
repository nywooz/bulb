import React, { Component } from "react";
import axios from "axios";

export default class CreateToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_title: "",
      todo_description: "",
      todo_completed: false
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

    console.log(`Form submitted:`);
    console.log(`Todo title: ${this.state.todo_title}`);
    console.log(`Todo description: ${this.state.todo_description}`);

    const { todo_title, todo_description, todo_completed } = this.state;

    const newTodo = {
      todo_title: todo_title,
      todo_description: todo_description,
      todo_completed: todo_completed
    };

    axios
      .post("http://localhost:3001/todos/add", newTodo)
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });

    this.setState({
      todo_title: "",
      todo_description: "",
      todo_completed: false
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_title}
              onChange={this.onChangeTodotitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTododescription}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create"
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    );
  }
}
