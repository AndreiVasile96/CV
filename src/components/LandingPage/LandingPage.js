/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from "prop-types";
import React from "react";
import MediaQuery from "react-responsive";

import ScrollTriangles from "../../assets/illustrations/ScrollTriangles.svg";
import LandingPageTitle from "./LandingPageTitle";

import "./LandingPage.scss";

function toggleRubberBand(event) {
  const el = event.currentTarget;
  el.classList.add("bouncing");
  const handle = () => {
    el.classList.remove("bouncing");
    el.removeEventListener("animationend", handle);
  };
  el.addEventListener("animationend", handle);
}

export default function LandingPage(props) {
  const { scroll, headerTextHighlightRef, refinview } = props;

  return (
    <div className="landingPage visible" id="landingPage">
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
            <MediaQuery maxWidth={912}>
              <span>Platform Ops</span>
              &nbsp;/&nbsp;
              <span>SRE</span>
              &nbsp;/&nbsp;
              <span>Full-Stack</span>
              &nbsp;
              <span>Developer</span>
            </MediaQuery>
            <MediaQuery minWidth={913}>
              <span
                className="landingPageBouncy"
                onMouseEnter={toggleRubberBand}
              >
                Platform Ops
              </span>
              &nbsp;/&nbsp;
              <span
                className="landingPageBouncy"
                onMouseEnter={toggleRubberBand}
              >
                SRE
              </span>
              &nbsp;/&nbsp;
              <span
                className="landingPageBouncy"
                onMouseEnter={toggleRubberBand}
              >
                Full-Stack
              </span>
              &nbsp;
              <span
                className="landingPageBouncy"
                onMouseEnter={toggleRubberBand}
              >
                Developer
              </span>
            </MediaQuery>
          </p>
        </div>
        <div>
          <button
            onClick={() => scroll("#contact")}
            className="main-btn-style landingPage--item-popin"
            type="button"
          >
            Contact me
          </button>
        </div>
        <div className="landingPage--scroll-group">
          <div className="landingPage--scroll landingPage--scroll--left">
            <button
              onClick={() => scroll("#about")}
              className="landingPage--scroll-btn come-from-below-delayed-more"
              type="button"
            >
              <p className="landingPage--scroll-text come-from-below-delayed-more">
                Scroll
              </p>
              <img src={ScrollTriangles} alt="Scroll Triangles" />
            </button>
          </div>
          <div className="landingPage--scroll landingPage--scroll--right">
            <button
              onClick={() => scroll("#about")}
              className="landingPage--scroll-btn come-from-below-delayed-more"
              type="button"
            >
              <p className="landingPage--scroll-text come-from-below-delayed-more">
                Scroll
              </p>
              <img src={ScrollTriangles} alt="Scroll Triangles" />
            </button>
          </div>
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
