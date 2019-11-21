import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateToDo from "./component/CreateToDo";
import EditToDo from "./component/EditTodo";
import TodosList from "./component/TodosList";

import logo from "./images/Bulb-Studios.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              className="navbar-brand"
              href="https://bulbstudios.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} width="60" height="60" alt="bulbstudios.com" />
            </a>
            <Link to="/" className="navbar-brand">
              To Dos App
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Todo
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} />
        </div>
      </Router>
    );
  }
}
export default App;
