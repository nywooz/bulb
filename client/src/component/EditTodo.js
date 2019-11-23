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
          <div className="card card bg-light mb-3" style={{}}>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Title </label>
                <div className="col-sm-10">
                  <input
                    placeholder="To do title..."
                    type="text"
                    className="form-control"
                    value={this.state.todo_title}
                    onChange={this.onChangeTodotitle}
                  />
                </div>

                {this.state.todo_titleValidatnMsg ? (
                  <div className="text-danger">Please enter a title.</div>
                ) : null}
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description </label>
                <div className="col-sm-10">
                  <input
                    placeholder="Take a note... "
                    type="text"
                    className="form-control"
                    value={this.state.todo_description}
                    onChange={this.onChangeTododescription}
                  />
                </div>

                {this.state.todo_descriptionValidatnMsg ? (
                  <div className="text-danger">Please enter a description.</div>
                ) : null}
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
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-danger px-3"
                    onClick={e => this.onDelete(e)}
                  >
                    🗑️ Delete
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
            </div>
          </div>
        </form>
      </div>
    );
  }
}
