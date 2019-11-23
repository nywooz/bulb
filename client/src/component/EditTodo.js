import React, { Component } from "react";

import axios from "axios";
import AddEditContent from "./EditAddContent";

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
    const that = this;
    const { ...newItem } = this.state;

    axios
      .patch(
        "http://localhost:3001/todos/" + this.props.match.params.id,
        newItem
      )
      .then(function(res) {
        console.log(res);
        that.setState({
          todo_title: "",
          todo_description: "",
          todo_completed: false
        });
        that.props.history.push("/");
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  };

  onDelete = e => {
    const todoID = this.props.match.params.id;
    const that = this;

    axios
      .delete("http://localhost:3001/todos/" + todoID)
      .then(function(res) {
        that.props.history.push("/");
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/todos/" + this.props.match.params.id)
      .then(res => {
        const { todo_title, todo_description, todo_completed } = res.data;

        this.setState({
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
          <AddEditContent
            todo_title={this.state.todo_title}
            onChangeTodotitle={this.onChangeTodotitle}
            todo_description={this.state.todo_description}
            onChangeTododescription={this.onChangeTododescription}
            todo_titleValidatnMsg={this.state.todo_titleValidatnMsg}
            todo_descriptionValidatnMsg={this.state.todo_descriptionValidatnMsg}
          >
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
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-danger px-3"
                  onClick={e => this.onDelete(e)}
                >
                  <span role="img" aria-label="bin">
                    🗑️
                  </span>
                  Delete
                </button>
              </div>
              <div className="col">
                <input
                  type="submit"
                  value="Update Todo"
                  className="btn btn-primary px-3 float-right"
                />
              </div>
            </div>
          </AddEditContent>
        </form>
      </div>
    );
  }
}
