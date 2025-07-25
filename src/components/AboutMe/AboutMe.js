import React, { useState } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import AboutMeTitle from "./AboutMeTitle";

// Import JSON data
import aboutMeData from "../../data/aboutMe.json";

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
    <div className={`aboutMe ${visible}`} id="about">
      <section className="aboutMe--center-flex">
        <MediaQuery maxWidth={912}>
          <AboutMeTitle
            mode="mobile"
            aboutMeRef={aboutMeRef}
            refinview={refinview}
          />
          <div className="aboutMe--description come-from-below align-text-center">
            {Array.isArray(aboutMeData.description.mobile)
              ? [
                <p className={comeFromBelow} key="mobile-1">{aboutMeData.description.mobile.slice(0, 2).join(" ")}</p>,
                <p className={comeFromBelow} key="mobile-2">{aboutMeData.description.mobile.slice(2, 4).join(" ")}</p>
              ]
              : <p className={comeFromBelow}>{aboutMeData.description.mobile}</p>}
          </div>
          <div className={`aboutMe--description-flex ${comeFromBelowDelayed} `}>
            {aboutMeData.experience.map((exp) => (
              <div key={exp.category} className="aboutMe--description-item">
                <h3 className="aboutMe--description-item-years">{exp.category}</h3>
                <p className="aboutMe--description-item-title">{exp.years}</p>
              </div>
            ))}
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
                {aboutMeData.experience.map((exp) => (
                  <div key={exp.category} className="aboutMe--description-item">
                    <h3 className="aboutMe--description-item-years">{exp.category}</h3>
                    <h3 className="aboutMe--description-item-title">{exp.yearsDesktop}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className={`second-column ${comeFromBelowDelayed} `}>
              {Array.isArray(aboutMeData.description.desktop)
                ? [
                  <p key="desktop-1">{aboutMeData.description.desktop.slice(0, 2).join(" ")}</p>,
                  <p key="desktop-2">{aboutMeData.description.desktop.slice(2, 4).join(" ")}</p>
                ]
                : <p>{aboutMeData.description.desktop}</p>}
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
