import React, { Component } from "react";

import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_title: "",
      todo_description: "",
      todo_completed: false
    };
    this.onChangeTodotitle = this.onChangeTodotitle.bind(this);
    this.onChangeTododescription = this.onChangeTododescription.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
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

  onChangeTodoCompleted = e => {
    this.setValue("todo_completed", !this.state.todo_completed);
  };

  onSubmit = e => {
    e.preventDefault();
    const { ...newItem } = this.state;
    const that = this;
    axios
      .patch(
        "http://localhost:3001/todos/" + that.props.match.params.id,
        newItem
      )
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
    this.props.history.push("/");
    this.setState({
      todo_title: "",
      todo_description: "",
      todo_completed: false
    });
  };

  componentDidMount() {
    const that = this;
    axios
      .get("http://localhost:3001/todos/" + that.props.match.params.id)
      .then(res => {
        const { todo_title, todo_description, todo_completed } = res.data;

        that.setState({
          todo_title: todo_title,
          todo_description: todo_description,
          todo_completed: todo_completed
        });
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_title || ""}
              onChange={this.onChangeTodotitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description || ""}
              onChange={this.onChangeTododescription}
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed || false}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
