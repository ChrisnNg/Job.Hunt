import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    Axios.get(
      `https://api.ziprecruiter.com/jobs/v1?search=${this.state.job}&location=${this.state.location},%20CA&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    ).then(res => {
      let jobs = [];

      res.data.jobs.map((job, index) => {
        console.log(job.name, index);
        jobs.push(
          <p key={index}>
            {job.name} at {job.location}
          </p>
        );
      });

      this.setState({ results: jobs });
      console.log("state results", this.state.results);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link">
            <span>Job Search by</span>{" "}
            <span id="zr_logo_container">
              <img
                id="zr_logo"
                src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png"
                alt="ZipRecruiter"
                width="120"
              />
            </span>
          </a>
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
            <Button type="submit">Submit</Button>
          </Form>
          <article>{this.state.results}</article>
        </div>
      </div>
    );
  }
}

export default App;
