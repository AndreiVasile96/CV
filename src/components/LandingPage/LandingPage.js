import PropTypes from "prop-types";

import React from "react";

import ATriangle from "./A-Triangle.svg";
import ScrollTriangles from "./ScrollTriangles.svg";
import "./LandingPage.scss";

export default function LandingPage(props) {
  const { scroll, headerTextHighlightRef } = props;
  return (
    <div className="landingPage" id="landingPage">
      <section className="landingPage--center-flex">
        <div className="landingPage--title">
          <h1 ref={headerTextHighlightRef}>Hi, my name is</h1>
          <h1>
            <img
              className="landingPage--ATriangle"
              src={ATriangle}
              alt="A triangle"
            />
            ndrei
          </h1>
        </div>
        <div className="landingPage--description">
          <p>DevOps / Cloud / Full-Stack Developer</p>
        </div>
        <div>
          <button
            onClick={() => scroll("#contact", "bot")}
            className="main-btn-style"
            type="button"
          >
            Contact me!
          </button>
        </div>
        <div className="landingPage--scroll">
          <p className="landingPage--scroll-text">Scroll</p>
          <button
            onClick={() => scroll("#about", "bot")}
            className="landingPage--scroll-btn"
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
  ]).isRequired
};
