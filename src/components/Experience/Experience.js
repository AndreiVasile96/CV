import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import ExperienceTitle from "./ExperienceTitle";

import "./Experience.scss";

class Experience extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: "work",

      renderAnimation: false,
      comeFromBelow: "",
      comeFromBelowDelayed: "",

      renderGridAnimation: "",
      visible: "invisible"
    };

    this.selectTab = this.selectTab.bind(this);
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation } = this.state;

    if (refinview === "experience" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        comeFromBelowDelayed: "come-from-below-delayed",
        renderAnimation: true,
        visible: "visible"
      });
    }
  }

  selectTab(target) {
    this.setState({
      selectedTab: target,
      renderGridAnimation: "come-from-below-fast"
    });
  }

  render() {
    const {
      selectedTab,
      comeFromBelow,
      comeFromBelowDelayed,
      renderGridAnimation,
      visible
    } = this.state;
    const { headerTextHighlightRef, refinview } = this.props;

    const workItems = [
      <div key={0} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2012 - Oct 2013)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={1} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2013 - Oct 2014)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>
    ];

    const educationItems = [
      <div key={2} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={3} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={4} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>,
      <div key={5} className="experience--item-general-box">
        <p className="experience--item-general-box-title">IBM UK</p>
        <p className="experience--item-general-box-date">
          (Nov 2020 - Oct 2014)
        </p>
        <p className="experience--item-general-box-description">
          DevOps developer, with extensive knowledge and years of experience,
          working with full stack technologies, delivering quality work.
        </p>
      </div>
    ];

    return (
      <div
        className={`experience ${visible}`}
        id="experience"
        refinview={refinview}
      >
        <section className="experience--center-flex">
          <MediaQuery maxWidth={912}>
            <ExperienceTitle
              mode="mobile"
              headerTextHighlightRef={headerTextHighlightRef}
              refinview={refinview}
            />
            <div className="experience--description" />
            <div className={`experience--btn-group ${comeFromBelow} `}>
              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "work" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("work")}
              >
                <p>Work</p>
              </button>

              <button
                className={`main-btn-style experience--btn-tab ${
                  selectedTab === "education" ? "cyan-btn-selected" : null
                }`}
                type="button"
                onClick={() => this.selectTab("education")}
              >
                <p>Education</p>
              </button>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-description">
                {workItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description ${
                      renderGridAnimation || comeFromBelowDelayed
                    } `}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <div className="experience--item-description">
                {educationItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description ${
                      renderGridAnimation || comeFromBelowDelayed
                    } `}
                  >
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
                  mode="desktop"
                  headerTextHighlightRef={headerTextHighlightRef}
                  refinview={refinview}
                />
              </div>
              <div className={`second-row ${comeFromBelow}`}>
                <div className="experience--btn-group">
                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "work" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("work")}
                  >
                    <p>Work</p>
                  </button>

                  <button
                    className={`main-btn-style experience--btn-tab ${
                      selectedTab === "education" ? "cyan-btn-selected" : null
                    }`}
                    type="button"
                    onClick={() => this.selectTab("education")}
                  >
                    <p>Education</p>
                  </button>
                </div>
              </div>
            </div>
            {selectedTab === "work" ? (
              <div className="experience--item-grid-desktop">
                {workItems.map((item) => (
                  <div
                    key={item.key}
                    className={`experience--item-description-desktop ${
                      renderGridAnimation || comeFromBelowDelayed
                    }`}
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
                    className={`experience--item-description-desktop ${
                      renderGridAnimation || comeFromBelowDelayed
                    }`}
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
  refinview: PropTypes.string.isRequired
};
