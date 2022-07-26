import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es";

import "./Experience.scss";

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
    bouncyList = document.querySelectorAll(".experienceBouncy");
  });

  if (mode === "mobile") {
    if (refinview === "experience" && !isTitleVisible) {
      const textWrapper = document.querySelector(".experience--title .letters");
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false }).add({
          targets: ".experience--title .letter",
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1)
        });
        setTitleToViewd(true);
      }
    }
  } else if (mode === "desktop") {
    if (refinview === "experience" && !isTitleVisible) {
      anime.timeline({ loop: false }).add({
        targets: ".experienceBouncy",
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
      <h1 ref={headerTextHighlightRef} className="experience--title">
        <span className="text-wrapper">
          <span className="letters">Experience</span>
        </span>
      </h1>
    );
  }

  if (mode === "desktop") {
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
}

ContactMe.propTypes = {
  mode: PropTypes.string.isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
