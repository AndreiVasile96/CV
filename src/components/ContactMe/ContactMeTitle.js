import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es";

import "./ContactMe.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function ContactMe(props) {
  const { headerTextHighlightRef, mode, refinview } = props;
  const [isTitleVisible, setTitleToViewd] = useState(false);

  useEffect(() => {
    bouncyList = document.querySelectorAll(".contactMeBouncy");
  });

  if (mode === "mobile") {
    if (refinview === "contactMe" && !isTitleVisible) {
      const textWrapper = document.querySelector(".contactMe--title .letters");
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false }).add({
          targets: ".contactMe--title .letter",
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1)
        });
      }
      setTitleToViewd(true);
    }
  } else if (mode === "desktop") {
    if (refinview === "contactMe" && !isTitleVisible) {
      anime.timeline({ loop: false }).add({
        targets: ".contactMeBouncy",
        scale: [0, 1],
        duration: 15,
        elasticity: 600,
        delay: (el, i) => 150 * (i + 1)
      });
      setTitleToViewd(true);
    }
  }

  if (mode === "mobile") {
    return (
      <h1 ref={headerTextHighlightRef} className="contactMe--title">
        <span className="text-wrapper">
          <span className="letters">Contact me</span>
        </span>
      </h1>
    );
  }

  if (mode === "desktop") {
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
}

ContactMe.propTypes = {
  mode: PropTypes.string.isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
