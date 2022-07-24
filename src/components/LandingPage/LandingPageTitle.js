import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ATriangle from "./A-Triangle.svg";
import "./LandingPage.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function LandingPageTitle(props) {
  useEffect(() => {
    bouncyList = document.querySelectorAll(".landingPageBouncy");
  });

  const { headerTextHighlightRef } = props;
  return (
    <div className="landingPage--title">
      <h1 ref={headerTextHighlightRef}>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(0)}
        >
          H
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(1)}
        >
          i
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(2)}
        >
          ,
        </span>
        &nbsp;
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(3)}
        >
          m
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(4)}
        >
          y
        </span>
        &nbsp;
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(5)}
        >
          n
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(6)}
        >
          a
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(7)}
        >
          m
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(8)}
        >
          e
        </span>
        &nbsp;
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(9)}
        >
          i
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(10)}
        >
          s
        </span>
      </h1>
      <h1>
        <img
          className="landingPage--ATriangle logo-bouncing-character"
          src={ATriangle}
          alt="A triangle"
        />
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(11)}
        >
          n
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(12)}
        >
          d
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(13)}
        >
          r
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(14)}
        >
          e
        </span>
        <span
          className="landingPageBouncy"
          onMouseEnter={() => toggleRubberBand(15)}
        >
          i
        </span>
      </h1>
    </div>
  );
}

LandingPageTitle.propTypes = {
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
