import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./ContactMe.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function ContactMe(props) {
  useEffect(() => {
    bouncyList = document.querySelectorAll(".contactMeBouncy");
  });

  const { headerTextHighlightRef } = props;
  return (
    <div className="contactMe--title">
      <h1 ref={headerTextHighlightRef}>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(0)}
        >
          C
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(1)}
        >
          o
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(2)}
        >
          n
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(3)}
        >
          t
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(4)}
        >
          a
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(5)}
        >
          c
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(6)}
        >
          t
        </span>
        &nbsp;
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(7)}
        >
          m
        </span>
        <span
          className="contactMeBouncy"
          onMouseEnter={() => toggleRubberBand(8)}
        >
          e
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
