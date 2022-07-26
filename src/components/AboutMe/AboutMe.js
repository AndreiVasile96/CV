import React, { useState } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import AboutMeTitle from "./AboutMeTitle";

import "./AboutMe.scss";

export default function AboutMe(props) {
  const { aboutMeRef, refinview } = props;
  const [comeFromBelow, setComeFromBelow] = useState("");
  const [comeFromBelowDelayed, setComeFromBelowDelayed] = useState("");
  const [isTitleVisible, setTitleToViewd] = useState(false);
  const [isFirstRender, setFirstRender] = useState(false);

  if (refinview === "aboutMe" && !isTitleVisible) {
    setComeFromBelow("come-from-below");
    setComeFromBelowDelayed("come-from-below-delayed");
    setTitleToViewd(true);
  }

  let visible = "invisible";
  if (isFirstRender) visible = "visible";
  else if (refinview === "aboutMe") {
    visible = "visible";
    setFirstRender(true);
  }

  return (
    <div className={`aboutMe ${visible}`} id="about" refinview={refinview}>
      <section className="aboutMe--center-flex">
        <MediaQuery maxWidth={912}>
          <AboutMeTitle
            mode="mobile"
            aboutMeRef={aboutMeRef}
            refinview={refinview}
          />
          <div
            className={`aboutMe--description come-from-below ${comeFromBelow} `}
          >
            <p>
              DevOps developer, with extensive knowledge and years of
              experience, working with full stack technologies, delivering
              quality work.
            </p>
          </div>
          <div className={`aboutMe--description-flex ${comeFromBelowDelayed} `}>
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <p className="aboutMe--description-item-title">
                Years experience
              </p>
            </div>
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <p className="aboutMe--description-item-title">
                Years experience
              </p>
            </div>
            <div className="aboutMe--description-item">
              <h3 className="aboutMe--description-item-years">4+</h3>
              <p className="aboutMe--description-item-title">
                Years experience
              </p>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={913}>
          <div className="two-columns">
            <div className="first-column">
              <AboutMeTitle
                mode="desktop"
                aboutMeRef={aboutMeRef}
                refinview={refinview}
              />
              <div className={`aboutMe--description-row ${comeFromBelow}`}>
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
            <div className={`second-column ${comeFromBelowDelayed} `}>
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
  aboutMeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
