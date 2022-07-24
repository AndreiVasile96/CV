import React from "react";
import PropTypes from "prop-types";

import MediaQuery from "react-responsive";

import ATriangle from "./A-Triangle.svg";
import "./AboutMe.scss";

export default function AboutMe(props) {
  const { headerTextHighlightRef } = props;
  return (
    <div className="aboutMe" id="about">
      <section className="aboutMe--center-flex">
        <MediaQuery maxWidth={912}>
          <div className="aboutMe--title">
            <h1 ref={headerTextHighlightRef}>
              <img
                className="aboutMe--ATriangle"
                src={ATriangle}
                alt="A triangle"
              />
              bout me
            </h1>
          </div>
          <div className="aboutMe--description">
            <p>
              DevOps developer, with extensive knowledge and years of
              experience, working with full stack technologies, delivering
              quality work.
            </p>
          </div>
          <div className="aboutMe--description-flex">
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <h3 className="aboutMe--description-item-title">
                Years experience
              </h3>
            </div>
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <h3 className="aboutMe--description-item-title">
                Years experience
              </h3>
            </div>
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <h3 className="aboutMe--description-item-title">
                Years experience
              </h3>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={913}>
          <div className="two-columns">
            <div className="first-column">
              <div className="aboutMe--title">
                <h1 ref={headerTextHighlightRef}>
                  <img
                    className="aboutMe--ATriangle"
                    src={ATriangle}
                    alt="A triangle"
                  />
                  bout me
                </h1>
              </div>
              <div className="aboutMe--description-row">
                <div className="aboutMe--description-item">
                  <h3 className="aboutMe--description-item-years">4+</h3>
                  <h3 className="aboutMe--description-item-title">
                    Years experience
                  </h3>
                </div>
                <div className="aboutMe--description-item">
                  <h3 className="aboutMe--description-item-years">4+</h3>
                  <h3 className="aboutMe--description-item-title">
                    Years experience
                  </h3>
                </div>
                <div className="aboutMe--description-item">
                  <h3 className="aboutMe--description-item-years">4+</h3>
                  <h3 className="aboutMe--description-item-title">
                    Years experience
                  </h3>
                </div>
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
                technologies, delivering quality work. DevOps developer, with
                extensive knowledge and years of experience, working with full
                stack technologies, delivering quality work. quality work.
                DevOps developer, with extensive knowledge and years of
                experience, working with full stack technologies, delivering
                quality work. DevOps developer, with extensive knowledge and
                years of experience, working with full stack technologies,
                delivering quality work.
              </p>
            </div>
          </div>
        </MediaQuery>
      </section>
    </div>
  );
}

AboutMe.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
