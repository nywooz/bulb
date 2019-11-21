import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Todo from "./Todo";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosUnsorted: [],
      todos: [],
      todo_completed: "default",
      todo_title: "default",
      todo_description: "default"
    };

    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.todoList = this.todoList.bind(this);
  }

  compareBy(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  sortBy(key, sort = "down") {
    let arrayCopy = [...this.state.todos];

    return sort === "down"
      ? arrayCopy.sort(this.compareBy(key))
      : arrayCopy.sort(this.compareBy(key)).reverse();
  }

  // method called every time the sort button is clicked
  // it will change the currentSort value to the next one
  onSortChange = sortKey => {
    let currentSort = this.state[sortKey];
    let nextSort;

    if (currentSort === "default") nextSort = "down";
    else if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";


    this.setState({
      [sortKey]: nextSort,
      todos:
        nextSort === "default"
          ? this.state.todosUnsorted
          : this.sortBy(sortKey, nextSort)
    });
  };

  getTodos() {
    const that = this;
    axios
      .get("http://localhost:3001/todos")
      .then(function(res) {
        that.setState({
          todosUnsorted: res.data,
          todos: res.data
        });
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  }

  setTodos = todoItem => {
    const that = this;
    const todoID = todoItem._id;
    todoItem.todo_completed = !todoItem.todo_completed;

    axios
      .patch("http://localhost:3001/todos/" + todoID, todoItem)
      .then(function(res) {
        that.setState(prevState => ({
          todos: prevState.todos.map(item =>
            item._id === todoID
              ? { ...item, todo_completed: todoItem.todo_completed }
              : item
          )
        }));
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  };

  onDelete = (e, todoID) => {
    const that = this;

    axios
      .delete("http://localhost:3001/todos/" + todoID)
      .then(function(res) {
        let filteredArray = that.state.todos.filter(
          item => item._id !== todoID
        );
        that.setState({ todos: filteredArray });
      })
      .catch(function(err) {
        console.log(err);
      })
      .then(function() {
        // always executed
      });
  };

  componentDidMount() {
    this.getTodos();
  }

  todoList() {
    const that = this;

    if (that.state.todos && that.state.todos.length === 0) {
      return (
        <tr>
          <td align="center" colSpan="5">
            No data available, please
            <Link to="/create" className="nav-link">
              <button type="button" className="btn btn-primary">
                Create Todo
              </button>
            </Link>
          </td>
        </tr>
      );
    }

    return that.state.todos.map(function(currentTodo, i) {
      return (
        <Todo
          todo={currentTodo}
          key={i}
          toggleCompleted={that.toggleCompleted}
          onDelete={that.onDelete}
        />
      );
    });
  }

  toggleCompleted = (e, todoItem) => {
    this.setTodos(todoItem);
  };

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <p> 1. Use Typescript if using Javascript</p>
        <p> 2. Dockerize the application to run in a container.</p>
        <p>
          3. Add protection to the endpoints such that a user can only interact
          with TODOs that have their user associated with them. A super user
          should be available to interact with all TODOs (this can be used in
          the above front end).
        </p>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead className="thead">
            <tr>
              <th onClick={() => this.onSortChange("todo_completed")}>
                Completed
              </th>
              <th onClick={() => this.onSortChange("todo_title")}>Title</th>
              <th onClick={() => this.onSortChange("todo_description")}>
                Description
              </th>

              <th>Action</th>
              <th></th>
            </tr>
          </thead>

          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
