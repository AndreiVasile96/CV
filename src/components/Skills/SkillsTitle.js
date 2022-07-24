import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./Skills.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function ContactMe(props) {
  useEffect(() => {
    bouncyList = document.querySelectorAll(".skillsBouncy");
  });

  const { headerTextHighlightRef } = props;
  return (
    <div className="skillsPage--title">
      <h1 ref={headerTextHighlightRef}>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(0)}>
          S
        </span>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(1)}>
          k
        </span>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(2)}>
          i
        </span>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(3)}>
          l
        </span>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(4)}>
          l
        </span>
        <span className="skillsBouncy" onMouseEnter={() => toggleRubberBand(5)}>
          s
        </span>
      </h1>
    </div>
  );
}

ContactMe.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
