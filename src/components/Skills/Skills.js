/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable operator-linebreak */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from "prop-types";
import React from "react";
import MediaQuery from "react-responsive";
import SkillsTitle from "./SkillsTitle";

// Import JSON data
import skillsData from "../../data/skills.json";

import downArrow from "../../assets/icons/V-Small-Triangle.svg";
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

  // Helper method to render skill illustrations
  renderSkillIllustration(category) {
    const { expand } = this.state;

    return (
      <div
        key={category.id}
        className={`skillsPage-skill-illustration ${
          expand === category.id ? "appear-text" : "disappear-text"
        }`}
      >
        {category.skills.map((skill, index) => (
          <div
            key={`${category.id}-${skill.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="skill-item-container"
            style={{
              animationDelay: expand === category.id ? `${0.2 + index * 0.1}s` : "0s"
            }}
          >
            <p className="skillsPage-skill-illustration-title">
              {skill.name}
            </p>
            <div className={`skillsPage-skill-illustration-bar-${skill.color}-${skill.level}`} />
          </div>
        ))}
      </div>
    );
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

    const downArrowDiv = (
      <img
        className="skillsPage--skill-img rotate-img"
        src={downArrow}
        alt="Down arrow"
      />
    );

    const upArrowDiv = (
      <img
        className="skillsPage--skill-img"
        src={downArrow}
        alt="Up arrow"
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
            <div className={`skillsPage--description align-text-center ${comeFromBelow}`}>
              {skillsData.descriptions.map((desc, index) => (
                <p key={`skills-desc-mobile-${desc.substring(0, 20).replace(/[^a-zA-Z0-9]/g, "")}`} className="skill--description-text" style={{ marginBottom: index < skillsData.descriptions.length - 1 ? "1rem" : "0" }}>
                  {index === skillsData.descriptions.length - 1 ? (
                    <>
                      {desc.split("contact me")[0]}
                      <a
                        role="button"
                        className="cyan-text invisible--buton"
                        onClick={() => scroll("#contact")}
                      >
                        &nbsp;Contact me.
                      </a>
                    </>
                  ) : (
                    desc
                  )}
                </p>
              ))}
            </div>
            <div className={`skillsPage--skills-items ${comeFromBelowDelayed}`}>
              {skillsData.categories.map((category) => (
                <div key={`mobile-${category.id}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      this.expandSkills(category.id);
                    }}
                    onTouchStart={(e) => {
                      // Ensure touch events work on mobile
                      e.stopPropagation();
                    }}
                    className={`skillsPage--skill remove-btn-style ${
                      expand === category.id ? "cyan-btn-selected" : null
                    }`}
                    style={{
                      pointerEvents: "auto",
                      touchAction: "manipulation",
                      cursor: "pointer"
                    }}
                  >
                    <div className="skillsPage-skill-btn">
                      <p className="skillsPage--skill-name">{category.title}</p>
                    </div>
                    {expand === category.id ? downArrowDiv : upArrowDiv}
                  </button>
                </div>
              ))}
            </div>
            <div className={`skillsPage--mobile-skill-illustrations ${comeFromBelowDelayedMore}`}>
              {skillsData.categories.map((category) => this.renderSkillIllustration(category))}
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
                    {skillsData.categories.map((category) => (
                      <button
                        key={`desktop-btn-${category.id}`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.expandSkills(category.id);
                        }}
                        className={`skillsPage--skill remove-btn-style ${
                          expand === category.id ? "cyan-btn-selected" : null
                        }`}
                        style={{
                          pointerEvents: "auto",
                          cursor: "pointer"
                        }}
                      >
                        <div className="skillsPage-skill-btn">
                          <p className="skillsPage--skill-name">{category.title}</p>
                        </div>
                        {expand === category.id ? downArrowDiv : upArrowDiv}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`second-column ${comeFromBelowDelayed}`}>
                  <div className={`skillsPage--description ${comeFromBelow}`}>
                    {skillsData.descriptions.map((desc, index) => (
                      <p key={`skills-desc-desktop-${desc.substring(0, 20).replace(/[^a-zA-Z0-9]/g, "")}`} className="skill--description-text" style={{ marginBottom: index < skillsData.descriptions.length - 1 ? "1rem" : "0" }}>
                        {index === skillsData.descriptions.length - 1 ? (
                          <>
                            {desc.split("contact me")[0]}
                            <a
                              role="button"
                              className="cyan-text invisible--buton"
                              onClick={() => scroll("#contact")}
                            >
                              &nbsp;Contact me.
                            </a>
                          </>
                        ) : (
                          desc
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`skillsPage--desktop-skill-illustration ${comeFromBelowDelayedMore}`}>
                {skillsData.categories.map((category) => this.renderSkillIllustration(category))}
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
