import React from "react";
import { Link } from "react-router-dom";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "font-strike" : ""}>
      {props.todo.todo_title}
    </td>
    <td className={props.todo.todo_completed ? "font-strike" : ""}>
      {props.todo.todo_description}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default Todo;
