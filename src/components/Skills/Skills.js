/* eslint-disable class-methods-use-this */

import PropTypes from "prop-types";

import React from "react";
import MediaQuery from "react-responsive";

import downArrow from "./V-Small-Triangle.svg";

import "./Skills.scss";

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: "devOps"
    };

    this.expandSkills = this.expandSkills.bind(this);
  }

  expandSkills(target) {
    const { expand } = this.state;
    if (target === expand) {
      this.setState({ expand: null });
    } else this.setState({ expand: target });
  }

  render() {
    const { expand } = this.state;
    // eslint-disable-next-line react/prop-types
    const { headerTextHighlightRef } = this.props;

    const devOpsSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "devOps" ? "appear-text" : "disappear-text"
        }`}
      >
        <h3 className="skillsPage-skill-illustration-title">DevOps</h3>
        <div className="skillsPage-skill-illustration-bar-cyan" />
        <h3 className="skillsPage-skill-illustration-title">DevOps</h3>
        <div className="skillsPage-skill-illustration-bar-red" />
        <h3 className="skillsPage-skill-illustration-title">DevOps</h3>
        <div className="skillsPage-skill-illustration-bar-cyan" />
      </div>
    );

    const cloudSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "cloud" ? "appear-text" : "disappear-text"
        }`}
      >
        <h3 className="skillsPage-skill-illustration-title">Cloud</h3>
        <div className="skillsPage-skill-illustration-bar-red" />
        <h3 className="skillsPage-skill-illustration-title">Cloud</h3>
        <div className="skillsPage-skill-illustration-bar-cyan" />
        <h3 className="skillsPage-skill-illustration-title">Cloud</h3>
        <div className="skillsPage-skill-illustration-bar-red" />
      </div>
    );

    const fullStackSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "fullStack" ? "appear-text" : "disappear-text"
        }`}
      >
        <h3 className="skillsPage-skill-illustration-title">Full-stack</h3>
        <div className="skillsPage-skill-illustration-bar-cyan" />
        <h3 className="skillsPage-skill-illustration-title">Full-stack</h3>
        <div className="skillsPage-skill-illustration-bar-red" />
        <h3 className="skillsPage-skill-illustration-title">Full-stack</h3>
        <div className="skillsPage-skill-illustration-bar-cyan" />
      </div>
    );

    const downArrowDiv = (
      <img
        className="skillsPage--skill-img rotate-img"
        src={downArrow}
        alt="Down arrow 3"
      />
    );

    const upArrowDiv = (
      <img
        className="skillsPage--skill-img"
        src={downArrow}
        alt="Down arrow 3"
      />
    );

    return (
      <div className="skillsPage" id="skills">
        <section className="skillsPage--center-flex">
          <MediaQuery maxWidth={912}>
            <div className="skillsPage--title">
              <h3 ref={headerTextHighlightRef}>Skills</h3>
            </div>
            <div className="skillsPage--description">
              <p>
                DevOps developer, with extensive knowledge and years of
                experience, working with full stack technologies, delivering
                quality work.
              </p>
            </div>
            <div className="skillsPage--skills-items">
              <button
                type="button"
                onClick={() => this.expandSkills("devOps")}
                className={`skillsPage--skill remove-btn-style ${
                  expand === "devOps" ? "cyan-btn-selected" : null
                }`}
              >
                <div className="skillsPage-skill-btn">
                  <h3 className="skillsPage--skill-name">DevOps</h3>
                </div>
                {expand === "devOps" ? downArrowDiv : upArrowDiv}
              </button>
              {devOpsSkills}
              <button
                type="button"
                onClick={() => this.expandSkills("cloud")}
                className={`skillsPage--skill remove-btn-style ${
                  expand === "cloud" ? "cyan-btn-selected" : null
                }`}
              >
                <div className="skillsPage-skill-btn">
                  <h3 className="skillsPage--skill-name">Cloud</h3>
                </div>
                {expand === "cloud" ? downArrowDiv : upArrowDiv}
              </button>
              {cloudSkills}
              <button
                type="button"
                onClick={() => this.expandSkills("fullStack")}
                className={`skillsPage--skill remove-btn-style ${
                  expand === "fullStack" ? "cyan-btn-selected" : null
                }`}
              >
                <div className="skillsPage-skill-btn">
                  <h3 className="skillsPage--skill-name">Full-Stack</h3>
                </div>
                {expand === "fullStack" ? downArrowDiv : upArrowDiv}
              </button>
              {fullStackSkills}
            </div>
          </MediaQuery>
          <MediaQuery minWidth={913}>
            <div>
              <div className="two-columns">
                <div className="first-column">
                  <div className="skillsPage--title">
                    <h3 ref={headerTextHighlightRef}>Skills</h3>
                  </div>
                  <div className="skillsPage--skills-items">
                    <button
                      type="button"
                      onClick={() => this.expandSkills("devOps")}
                      className={`skillsPage--skill remove-btn-style ${
                        expand === "devOps" ? "cyan-btn-selected" : null
                      }`}
                    >
                      <div className="skillsPage-skill-btn">
                        <h3 className="skillsPage--skill-name">DevOps</h3>
                      </div>
                      {expand === "devOps" ? downArrowDiv : upArrowDiv}
                    </button>
                    <button
                      type="button"
                      onClick={() => this.expandSkills("cloud")}
                      className={`skillsPage--skill remove-btn-style ${
                        expand === "cloud" ? "cyan-btn-selected" : null
                      }`}
                    >
                      <div className="skillsPage-skill-btn">
                        <h3 className="skillsPage--skill-name">Cloud</h3>
                      </div>
                      {expand === "cloud" ? downArrowDiv : upArrowDiv}
                    </button>
                    <button
                      type="button"
                      onClick={() => this.expandSkills("fullStack")}
                      className={`skillsPage--skill remove-btn-style ${
                        expand === "fullStack" ? "cyan-btn-selected" : null
                      }`}
                    >
                      <div className="skillsPage-skill-btn">
                        <h3 className="skillsPage--skill-name">Full-Stack</h3>
                      </div>
                      {expand === "fullStack" ? downArrowDiv : upArrowDiv}
                    </button>
                  </div>
                </div>
                <div className="second-column">
                  <p>
                    DevOps developer, with extensive knowledge and years of
                    experience, working with full stack technologies, delivering
                    quality work. DevOps developer, with extensive knowledge and
                    years of experience, working with full stack technologies,
                    delivering quality work. DevOps developer, with extensive
                    knowledge and years of experience, working with full stack
                    technologies, delivering quality work. DevOps developer,
                    with extensive knowledge and years of experience, working
                    with full stack technologies, delivering quality work. years
                    of experience, working with full stack technologies,
                    delivering quality work. DevOps developer, with extensive
                    knowledge and years of experience, working with full stack
                    technologies, delivering quality work. quality work. DevOps
                    developer, with extensive knowledge and years of experience,
                    working with full stack technologies, delivering quality
                    work. DevOps developer, with extensive knowledge and years
                    of experience, working with full stack technologies,
                    delivering quality work.
                  </p>
                </div>
              </div>
              <div className="skillsPage--desktop-skill-illustration">
                {devOpsSkills}
                {cloudSkills}
                {fullStackSkills}
              </div>
            </div>
          </MediaQuery>
        </section>
      </div>
    );
  }
}

export default Skills;

Skills.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
