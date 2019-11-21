import React from "react";
import { Link } from "react-router-dom";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "font-strike opacity-4" : ""}>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={e => props.toggleCompleted(e, props.todo)}
          checked={props.todo.todo_completed}
          value={props.todo.todo_completed || false}
        />
      </div>
    </td>
    <td className={props.todo.todo_completed ? "font-strike opacity-4" : ""}>
      {props.todo.todo_title}
    </td>
    <td className={props.todo.todo_completed ? "font-strike opacity-4" : ""}>
      {props.todo.todo_description}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
    <td>
      <button
        type="button"
        className="btn btn-danger"
        onClick={e => props.onDelete(e, props.todo._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default Todo;
