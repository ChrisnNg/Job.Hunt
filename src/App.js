import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state);
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jobget's Assignment</h2>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Label>What</Form.Label>
                <Form.Control
                  name="job"
                  placeholder="Job Title, keywords, or company"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Where</Form.Label>
                <Form.Control
                  name="location"
                  placeholder="City or Province"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>
            <Button type="submit" value="Submit" />
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
