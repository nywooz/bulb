import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Todo extends Component {
  state = {
    isMouseInside: false
  };

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };

  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  render() {
    const { onDelete, todo, toggleCompleted } = this.props;

    return (
      <tr onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <td className={todo.todo_completed ? "font-strike opacity-4" : ""}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={e => toggleCompleted(e, todo)}
              checked={todo.todo_completed}
              value={todo.todo_completed || false}
            />
          </div>
        </td>
        <td className={todo.todo_completed ? "font-strike opacity-4" : ""}>
          {todo.todo_title}
        </td>
        <td className={todo.todo_completed ? "font-strike opacity-4" : ""}>
          {todo.todo_description}
        </td>
        <td>
          <Link to={"/edit/" + todo._id}>Edit</Link>
        </td>
        <td style={{ width: "70px" }}>
          {this.state.isMouseInside ? (
            <button
              type="button"
              className="btn btn-sm btn-danger rounded-circle m-0"
              onClick={e => onDelete(e, todo._id)}
            >
              X
            </button>
          ) : null}
        </td>
      </tr>
    );
  }
}
