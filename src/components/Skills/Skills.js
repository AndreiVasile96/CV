/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */

import PropTypes from "prop-types";
import React from "react";
import MediaQuery from "react-responsive";
import SkillsTitle from "./SkillsTitle";

import downArrow from "../../images/V-Small-Triangle.svg";
import "./Skills.scss";

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: "devOps",

      comeFromBelow: "",
      comeFromBelowDelayed: "",
      comeFromBelowDelayedMore: "",

      renderAnimation: false,
      visible: "invisible"
    };

    this.expandSkills = this.expandSkills.bind(this);
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation } = this.state;

    if (refinview === "skills" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        comeFromBelowDelayed: "come-from-below-delayed",
        comeFromBelowDelayedMore: "come-from-below-delayed-more",
        renderAnimation: true,
        visible: "visible"
      });
    }
  }

  expandSkills(target) {
    const { expand } = this.state;
    if (target === expand) {
      this.setState({ expand: null });
    } else this.setState({ expand: target });
  }

  render() {
    const {
      expand,
      comeFromBelow,
      comeFromBelowDelayed,
      comeFromBelowDelayedMore,
      visible
    } = this.state;
    const { headerTextHighlightRef, refinview, scroll } = this.props;

    const devOpsSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "devOps" ? "appear-text" : "disappear-text"
        }`}
      >
        <p className="skillsPage-skill-illustration-title">
          Continous Integration and Delivery
        </p>
        <div className="skillsPage-skill-illustration-bar-cyan-95" />

        <p className="skillsPage-skill-illustration-title">
          Operations and Responsability
        </p>
        <div className="skillsPage-skill-illustration-bar-red-90" />

        <p className="skillsPage-skill-illustration-title">
          Monitoring and Automation
        </p>
        <div className="skillsPage-skill-illustration-bar-cyan-85" />

        <p className="skillsPage-skill-illustration-title">
          Agile and Communication
        </p>
        <div className="skillsPage-skill-illustration-bar-red-85" />
      </div>
    );

    const cloudSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "cloud" ? "appear-text" : "disappear-text"
        }`}
      >
        <p className="skillsPage-skill-illustration-title">
          Cloud Infrastructure (IBM, AWS)
        </p>
        <div className="skillsPage-skill-illustration-bar-red-90" />

        <p className="skillsPage-skill-illustration-title">
          Network, Migration and Microservices
        </p>
        <div className="skillsPage-skill-illustration-bar-cyan-85" />

        <p className="skillsPage-skill-illustration-title">
          Docker, Kubernetes and VMs
        </p>
        <div className="skillsPage-skill-illustration-bar-red-85" />
      </div>
    );

    const fullStackSkills = (
      <div
        className={`skillsPage-skill-illustration ${
          expand === "fullStack" ? "appear-text" : "disappear-text"
        }`}
      >
        <p className="skillsPage-skill-illustration-title">
          JavaScript: Node, React and Database
        </p>
        <div className="skillsPage-skill-illustration-bar-cyan-95" />

        <p className="skillsPage-skill-illustration-title">
          Python 3, Golang, Bash and Linux
        </p>
        <div className="skillsPage-skill-illustration-bar-red-90" />

        <p className="skillsPage-skill-illustration-title">
          Architecture, Design and APIs
        </p>
        <div className="skillsPage-skill-illustration-bar-cyan-85" />
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
      <div className={`skillsPage ${visible}`} id="skills">
        <section className="skillsPage--center-flex">
          <MediaQuery maxWidth={912}>
            <SkillsTitle
              mode="mobile"
              headerTextHighlightRef={headerTextHighlightRef}
              refinview={refinview}
            />
            <div
              className={`skillsPage--description align-text-center ${comeFromBelow} `}
            >
              <p className="skill--description-text">
                These are just a small sample of selected skills that I have
                developed over the years, by working with amazing people. I am
                interested in data, mathematics, and design, besides my inclination
                towards computer sciences. Eager in finding more? Please
                <a
                  role="button"
                  className="cyan-text invisible--buton"
                  onClick={() => scroll("#contact")}
                >
                  &nbsp;contact me
                </a>
                .
              </p>
            </div>
            <div
              className={`skillsPage--skills-items ${comeFromBelowDelayed} `}
            >
              <button
                type="button"
                onClick={() => this.expandSkills("devOps")}
                className={`skillsPage--skill remove-btn-style ${
                  expand === "devOps" ? "cyan-btn-selected" : null
                }`}
              >
                <div className="skillsPage-skill-btn">
                  <p className="skillsPage--skill-name">Dev-Ops</p>
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
                  <p className="skillsPage--skill-name">Cloud</p>
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
                  <p className="skillsPage--skill-name">Full-Stack</p>
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
                  <SkillsTitle
                    mode="desktop"
                    headerTextHighlightRef={headerTextHighlightRef}
                    refinview={refinview}
                  />
                  <div className={`skillsPage--skills-items ${comeFromBelow}`}>
                    <button
                      type="button"
                      onClick={() => this.expandSkills("devOps")}
                      className={`skillsPage--skill remove-btn-style ${
                        expand === "devOps" ? "cyan-btn-selected" : null
                      }`}
                    >
                      <div className="skillsPage-skill-btn">
                        <p className="skillsPage--skill-name">Dev-Ops</p>
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
                        <p className="skillsPage--skill-name">Cloud</p>
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
                        <p className="skillsPage--skill-name">Full-Stack</p>
                      </div>
                      {expand === "fullStack" ? downArrowDiv : upArrowDiv}
                    </button>
                  </div>
                </div>
                <div
                  className={`second-column skills--flex-end ${comeFromBelowDelayed} `}
                >
                  <div>
                    These are just a small sample of selected skills that I have
                    developed over the years, by working with amazing people. I am
                    interested in data, mathematics, and design, besides my inclination
                    towards computer sciences. Eager in finding more? Please
                    <a
                      role="button"
                      className="cyan-text invisible--buton"
                      onClick={() => scroll("#contact")}
                    >
                      &nbsp;contact me
                    </a>
                    .
                  </div>
                </div>
              </div>
              <div
                className={`skillsPage--desktop-skill-illustration ${comeFromBelowDelayedMore}`}
              >
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
  ]).isRequired,
  refinview: PropTypes.string.isRequired,
  scroll: PropTypes.func.isRequired
};
