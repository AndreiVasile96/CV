import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ATriangle from "./A-Triangle.svg";
import "./AboutMe.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function AboutMe(props) {
  useEffect(() => {
    bouncyList = document.querySelectorAll(".aboutMeBouncy");
  });

  const { headerTextHighlightRef } = props;
  return (
    <div className="aboutMe--title">
      <h1 ref={headerTextHighlightRef}>
        <img className="aboutMe--ATriangle" src={ATriangle} alt="A triangle" />
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(0)}
        >
          b
        </span>
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(1)}
        >
          o
        </span>
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(2)}
        >
          u
        </span>
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(3)}
        >
          t
        </span>
        &nbsp;
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(4)}
        >
          m
        </span>
        <span
          className="aboutMeBouncy"
          onMouseEnter={() => toggleRubberBand(5)}
        >
          e
        </span>
      </h1>
    </div>
  );
}

AboutMe.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
