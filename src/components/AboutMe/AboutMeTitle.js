import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es";

import ATriangle from "../../images/A-Triangle.svg";
import "./AboutMe.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function AboutMe(props) {
  const { aboutMeRef, mode, refinview } = props;
  const [isTitleVisible, setTitleToViewd] = useState(false);

  useEffect(() => {
    bouncyList = document.querySelectorAll(".aboutMeBouncy");
  });

  if (mode === "mobile") {
    if (refinview === "aboutMe" && !isTitleVisible) {
      const textWrapper = document.querySelector(".aboutMe--title .letters");
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false }).add({
          targets: ".aboutMe--title .letter",
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1)
        });
        setTitleToViewd(true);
      }
    }
  } else if (mode === "desktop") {
    if (refinview === "aboutMe" && !isTitleVisible) {
      anime.timeline({ loop: false }).add({
        targets: ".aboutMeBouncy",
        scale: [0, 1],
        duration: 10,
        elasticity: 600,
        delay: (el, i) => 200 * (i + 1)
      });
      setTitleToViewd(true);
    }
  }

  if (mode === "mobile") {
    return (
      <h2 ref={aboutMeRef} className="aboutMe--title">
        <img
          className="aboutMe--ATriangle aboutMe--ATriangle-mobile come-from-below"
          src={ATriangle}
          alt="A triangle"
        />
        <span className="text-wrapper">
          <span className="letters">bout me</span>
        </span>
      </h2>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="aboutMe--title">
        <h2 ref={aboutMeRef}>
          <img
            className="aboutMe--ATriangle"
            src={ATriangle}
            alt="A triangle"
          />
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
        </h2>
      </div>
    );
  }
}

AboutMe.propTypes = {
  mode: PropTypes.string.isRequired,
  aboutMeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
