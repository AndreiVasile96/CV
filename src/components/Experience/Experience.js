import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ExperienceTitle from "./ExperienceTitle";

import "./Experience.scss";

class Experience extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "work"
    };

    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(target) {
    this.setState({ selectedTab: target });
  }

  render() {
    const { selectedTab } = this.state;
    const { headerTextHighlightRef, refInView } = this.props;

    if (refInView === "experience") {
      const bouncyTitle = document.querySelector(".experience--title");
      bouncyTitle.classList.add("bouncing");
      bouncyTitle.addEventListener("animationend", () => {
        bouncyTitle.classList.remove("bouncing");
      });
    }

    const workItems = [
      <div key={0} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2012 - Oct 2013)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={1} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2013 - Oct 2014)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>
    ];

    const educationItems = [
      <div key={2} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={3} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={4} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={5} className="experience--item-general-box">
        <h3 className="experience--item-general-box-title">IBM UK</h3>
        <h3 className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </h3>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>
    ];

    return (
      <div className="experience" id="experience">
        <section className="experience--center-flex">
          <MediaQuery maxWidth={912}>
            <div className="experience--title">
              <h1 ref={headerTextHighlightRef}>Experience</h1>
            </div>
            <div className="experience--description" />
            <div className="experience--btn-group">
              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "work" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("work")}
              >
                <h3>Work</h3>
              </button>

              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "education" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("education")}
              >
                <h3>Education</h3>
              </button>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-description">
                {workItems.map((item) => (
                  <div key={item.key} className="experience--item-description">
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="experience--item-description">
                {educationItems.map((item) => (
                  <div key={item.key} className="experience--item-description">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </MediaQuery>
          <MediaQuery minWidth={913}>
            <div className="two-rows">
              <div className="first-row">
                <ExperienceTitle
                  headerTextHighlightRef={headerTextHighlightRef}
                />
              </div>
              <div className="second-row">
                <div className="experience--btn-group">
                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "work" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("work")}
                  >
                    <h3>Work</h3>
                  </button>

                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "education" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("education")}
                  >
                    <h3>Education</h3>
                  </button>
                </div>
              </div>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-grid-desktop">
                {workItems.map((item) => (
                  <div
                    key={item.key}
                    className="experience--item-description-desktop"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="experience--item-grid-desktop">
                {educationItems.map((item) => (
                  <div
                    key={item.key}
                    className="experience--item-description-desktop"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </MediaQuery>
        </section>
      </div>
    );
  }
}

export default Experience;

Experience.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refInView: PropTypes.string.isRequired
};
