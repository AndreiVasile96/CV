/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs";

// import ATriangle from "../../assets/icons/A-Triangle.svg";
import ATriangle from "../../assets/icons/Crop-Bold-A-Triangle.svg";
import "./LandingPage.scss";

let bouncyList;
let triangleElement;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

function toggleTriangleRubberBand() {
  if (triangleElement) {
    triangleElement.classList.add("bouncing");
    triangleElement.addEventListener("animationend", () => {
      triangleElement.classList.remove("bouncing");
    });
  }
}

export default function LandingPageTitle(props) {
  const { headerTextHighlightRef, mode, refinview } = props;
  const [isTitleVisible, setTitleToViewd] = useState(false);

  useEffect(() => {
    bouncyList = document.querySelectorAll(".landingPageBouncy");
    triangleElement = document.querySelector(".landingPage--ATriangle");
  });

  if (mode === "mobile") {
    if (refinview === "landingPage" && !isTitleVisible) {
      const textWrapper = document.querySelector(
        ".landingPage--title .letters"
      );
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false }).add({
          targets: ".landingPage--title .letter",
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1)
        });
        setTitleToViewd(true);
      }
    }
  } else if (mode === "desktop") {
    if (refinview === "landingPage" && !isTitleVisible) {
      anime.timeline({ loop: false }).add({
        targets: ".landingPageBouncy",
        scale: [0, 1],
        duration: 15,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
      }).add({
        // Animate triangle with the letters
        targets: ".landingPage--ATriangle",
        scale: [0, 1],
        duration: 15,
        elasticity: 600,
        delay: 0 // Triangle appears first
      }, 0); // Start at the same time as letters
      setTitleToViewd(true);
    }
  }

  if (mode === "mobile") {
    return (
      <h1 ref={headerTextHighlightRef} className="landingPage--title">
        <span className="text-wrapper">
          <span className="letters">Hello, I am</span>
          &nbsp;
          <span className="landingPage--name-popin landingPage--name-popin--block">
            <img
              className="landingPage--ATriangle"
              src={ATriangle}
              alt="A triangle"
            />
            ndrei
          </span>
        </span>
      </h1>
    );
  }

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
          className="landingPageBouncy landingPage--ATriangle logo-bouncing-character"
          src={ATriangle}
          alt="A triangle"
          onMouseEnter={() => toggleTriangleRubberBand()}
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
  mode: PropTypes.string.isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
