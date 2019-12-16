import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      numOfJobs: 10,
      job: "",
      location: "",
      radius: 25,
      age: "",
      loading: false
    };
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
    this.setState({ loading: true });
    Axios.get(
      `https://api.ziprecruiter.com/jobs/v1?search=${this.state.job}&location=${this.state.location},%20CA&radius_miles=${this.state.radius}&days_ago=${this.state.age}&jobs_per_page=${this.state.numOfJobs}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    ).then(res => {
      let jobs = [];

      res.data.jobs.forEach((job, index) => {
        console.log(job, index);
        jobs.push(
          <p key={index}>
            {job.name} at {job.location} and posted {job.job_age}days ago
          </p>
        );
      });

      this.setState({ results: jobs, loading: false });
      console.log("state", this.state);
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

            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Results per page</Form.Label>
                  <Form.Control
                    name="numOfJobs"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Radius (miles)</Form.Label>
                  <Form.Control
                    name="radius"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Max day's since post</Form.Label>
                <Form.Control
                  name="age"
                  placeholder="Day's"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>

            <Button type="submit">
              {" "}
              {!this.state.loading ? (
                "Submit"
              ) : (
                <React.Fragment>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </React.Fragment>
              )}
            </Button>
          </Form>
          <section>{this.state.results}</section>
        </div>
      </div>
    );
  }
}

export default App;
