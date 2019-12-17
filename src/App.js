import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import Footer from "./components/Footer.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ["Results will be displayed here."],
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
    event.preventDefault();
    this.setState({ loading: true });
    Axios.get(
      `https://api.ziprecruiter.com/jobs/v1?search=${this.state.job}&location=${this.state.location},%20CA&radius_miles=${this.state.radius}&days_ago=${this.state.age}&jobs_per_page=${this.state.numOfJobs}&page=1&api_key=${process.env.REACT_APP_API_KEY}`
    ).then(res => {
      let jobs = [];

      if (res.data.jobs.length === 0) {
        jobs = <p>No jobs found.</p>;
        this.setState({ results: jobs, loading: false });
      }

      res.data.jobs.forEach((job, index) => {
        console.log(job, index);
        jobs.push(
          <article key={index}>
            <a href={job.url}>{job.name}</a>
            <p>
              at {job.location} - posted {job.posted_time_friendly}
            </p>
            <p>
              <b>
                ${job.salary_min} - ${job.salary_max} a year
              </b>
            </p>
            <p>{ReactHtmlParser(job.snippet)}</p>
          </article>
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
          <h2>Jobget's Assignment</h2>
        </div>
        <div>
          <Form onSubmit={this.handleSubmit} className="bottom-border">
            <Form.Row>
              <Form.Label>
                <i className="fas fa-search form-search" />
              </Form.Label>
              <Col>
                <Form.Control
                  name="job"
                  placeholder="Job Title, keywords, or company"
                  onChange={this.handleChange}
                />
              </Col>
              <Form.Label>
                <i className="fas fa-map-marker-alt form-search" />
              </Form.Label>
              <Col>
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
        <Footer />
      </div>
    );
  }
}

export default App;
