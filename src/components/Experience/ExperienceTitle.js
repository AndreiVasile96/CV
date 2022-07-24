import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "./Experience.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function ContactMe(props) {
  useEffect(() => {
    bouncyList = document.querySelectorAll(".experienceBouncy");
  });

  const { headerTextHighlightRef } = props;
  return (
    <div className="experience--title">
      <h1 ref={headerTextHighlightRef}>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(0)}
        >
          E
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(1)}
        >
          x
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(2)}
        >
          p
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(3)}
        >
          e
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(4)}
        >
          r
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(5)}
        >
          i
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(6)}
        >
          e
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(7)}
        >
          n
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(8)}
        >
          c
        </span>
        <span
          className="experienceBouncy"
          onMouseEnter={() => toggleRubberBand(9)}
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
