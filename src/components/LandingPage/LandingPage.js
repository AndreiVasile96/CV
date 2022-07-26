/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import MediaQuery from "react-responsive";

import ScrollTriangles from "./ScrollTriangles.svg";
import LandingPageTitle from "./LandingPageTitle";

import "./LandingPage.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function LandingPage(props) {
  const { scroll, headerTextHighlightRef, refinview } = props;

  useEffect(() => {
    bouncyList = document.querySelectorAll(".landingPageBouncy");
  });

  return (
    <div className="landingPage visible" id="landingPage" refinview={refinview}>
      <section className="landingPage--center-flex">
        <MediaQuery maxWidth={912}>
          <LandingPageTitle
            headerTextHighlightRef={headerTextHighlightRef}
            refinview={refinview}
            mode="mobile"
          />
        </MediaQuery>
        <MediaQuery minWidth={913}>
          <LandingPageTitle
            headerTextHighlightRef={headerTextHighlightRef}
            refinview={refinview}
            mode="desktop"
          />
        </MediaQuery>
        <div className="landingPage--description landingPage--item-popin">
          <p>
            <span
              className="landingPageBouncy"
              onMouseEnter={() => toggleRubberBand(16)}
            >
              Dev-Ops
            </span>
            &nbsp;/&nbsp;
            <span
              className="landingPageBouncy"
              onMouseEnter={() => toggleRubberBand(17)}
            >
              Cloud
            </span>
            &nbsp;/&nbsp;
            <span
              className="landingPageBouncy"
              onMouseEnter={() => toggleRubberBand(18)}
            >
              Full-Stack
            </span>
            &nbsp;
            <span
              className="landingPageBouncy"
              onMouseEnter={() => toggleRubberBand(19)}
            >
              Developer
            </span>
          </p>
        </div>
        <div>
          <button
            onClick={() => scroll("#contact", "bot")}
            className="main-btn-style landingPage--item-popin"
            type="button"
          >
            Contact me!
          </button>
        </div>
        <div className="landingPage--scroll">
          <p className="landingPage--scroll-text come-from-below-delayed-more">
            Scroll
          </p>
          <button
            onClick={() => scroll("#about", "bot")}
            className="landingPage--scroll-btn come-from-below-delayed-more"
            type="button"
          >
            <img src={ScrollTriangles} alt="Scroll Triangles" />
          </button>
        </div>
      </section>
    </div>
  );
}

LandingPage.propTypes = {
  scroll: PropTypes.func.isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
