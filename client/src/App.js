import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import CreateToDo from "./component/CreateToDo";
import EditToDo from "./component/EditTodo";
import TodosList from "./component/TodosList";

import logo from "./images/Bulb-Studios.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
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
