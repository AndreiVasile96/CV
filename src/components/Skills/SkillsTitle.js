import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es";

import "./Skills.scss";

let bouncyList;

function toggleRubberBand(id) {
  bouncyList[id].classList.add("bouncing");
  bouncyList[id].addEventListener("animationend", () => {
    bouncyList[id].classList.remove("bouncing");
  });
}

export default function Skills(props) {
  const { headerTextHighlightRef, mode, refinview } = props;
  const [isTitleVisible, setTitleToViewd] = useState(false);

  useEffect(() => {
    bouncyList = document.querySelectorAll(".skillsPageBouncy");
  });

  if (mode === "mobile") {
    if (refinview === "skills" && !isTitleVisible) {
      const textWrapper = document.querySelector(".skillsPage--title .letters");
      if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        anime.timeline({ loop: false }).add({
          targets: ".skillsPage--title .letter",
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i + 1)
        });
        setTitleToViewd(true);
      }
    }
  } else if (mode === "desktop") {
    if (refinview === "skills" && !isTitleVisible) {
      anime.timeline({ loop: false }).add({
        targets: ".skillsPageBouncy",
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
      <h1 ref={headerTextHighlightRef} className="skillsPage--title">
        <span className="text-wrapper">
          <span className="letters">Skills</span>
        </span>
      </h1>
    );
  }

  if (mode === "desktop") {
    return (
      <div className="skillsPage--title">
        <h1 ref={headerTextHighlightRef}>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(0)}
          >
            S
          </span>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(1)}
          >
            k
          </span>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(2)}
          >
            i
          </span>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(3)}
          >
            l
          </span>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(4)}
          >
            l
          </span>
          <span
            className="skillsPageBouncy"
            onMouseEnter={() => toggleRubberBand(5)}
          >
            s
          </span>
        </h1>
      </div>
    );
  }
}

Skills.propTypes = {
  mode: PropTypes.string.isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};
