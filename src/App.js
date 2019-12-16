import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jobget's Assignment</h2>
        </div>
        <div>
          <Form>
            <Form.Row>
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Form.Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
