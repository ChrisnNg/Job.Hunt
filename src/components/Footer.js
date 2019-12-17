import React from "react";

const Footer = props => {
  return (
    <React.Fragment>
      <section>
        <i className="fas fa-copyright" />
        &nbsp;Christopher Ng 2019
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
      </section>
    </React.Fragment>
  );
};

export default Footer;
