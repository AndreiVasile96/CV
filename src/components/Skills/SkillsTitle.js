import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";

import "./Skills.scss";

class SkillsTitle extends React.Component {
  constructor() {
    super();
    this.state = {
      renderAnimation: false,
      comeFromBelow: "",
      visible: "invisible"
    };
    this.bouncyList = null;
    this.hoverHandlers = [];
    this.titleObserver = null;
    this.observerDriven = false;
  }

  componentDidMount() {
    this.bouncyList = document.querySelectorAll(".skillsPageBouncy");

    // Collapse the letters up front. anime.js applies the `scale: [0, 1]`
    // start value on its first animation frame, which is one paint after the
    // title becomes visible - so the title appeared fully formed, vanished,
    // then animated in. Setting the start state here happens in the same
    // commit, so that frame never renders.
    this.bouncyList.forEach((letter) => {
      // eslint-disable-next-line no-param-reassign
      letter.style.transform = "scale(0)";
    });

    // Trigger on the title entering the viewport rather than on the section.
    // The section reports in view long before the title is on screen, so on
    // tall mobile layouts the animation played off-screen and was over by the
    // time the title arrived.
    const title = document.querySelector("#skills-title");
    if (title && typeof IntersectionObserver !== "undefined") {
      this.observerDriven = true;
      this.titleObserver = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          // Reveal and animate together, or the animation plays against a
          // title that is still hidden.
          this.setState({
            comeFromBelow: "come-from-below",
            renderAnimation: true,
            visible: "visible"
          });
          this.initializeBouncyAnimation();
          this.titleObserver.disconnect();
          this.titleObserver = null;
        }
      }, {
        // Fire when the title reaches the middle of the screen, not when it
        // clips the bottom edge. Measured on a 915px-tall phone, a smaller
        // margin started the animation with the title 81% of the way down and
        // it was finished by 72% - all of it happening at the very edge of
        // vision, so a short title like "Skills" looked like it never animated
        // at all by the time it was somewhere you would actually read it.
        rootMargin: "0px 0px -42% 0px",
        threshold: 0.1
      });
      this.titleObserver.observe(title);
    } else {
      this.initializeBouncyAnimation();
    }
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation } = this.state;

    if (!this.observerDriven && refinview === "skills" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        renderAnimation: true,
        visible: "visible"
      });
    }
  }

  componentWillUnmount() {
    if (this.titleObserver) this.titleObserver.disconnect();
    this.teardownBouncyAnimation();
  }

  teardownBouncyAnimation = () => {
    this.hoverHandlers.forEach(([element, handler]) => {
      element.removeEventListener("mouseover", handler);
    });
    this.hoverHandlers = [];
  };

  initializeBouncyAnimation = () => {
    this.teardownBouncyAnimation();

    // Spread the stagger across a fixed sweep rather than using a fixed
    // per-letter delay. With a constant step, a short word finishes its sweep
    // in a fraction of the time a long one takes - "Skills" (6 letters) swept
    // in 228ms and read as appearing all at once, while "Experience" (10)
    // swept over 380ms and visibly ran left to right. Dividing a fixed budget
    // by the letter count makes every title sweep for the same duration.
    const sweepStep = Math.round(420 / Math.max(1, this.bouncyList.length));

    // Animate letters on load - faster animation
    anime.timeline({ loop: false }).add({
      targets: ".skillsPageBouncy",
      scale: [0, 1],
      duration: 320,
      easing: "easeOutElastic(1, 0.6)",
      delay: (el, i) => sweepStep * (i + 1)
    });

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".skillsPageBouncy");
    this.bouncyList.forEach((letter, index) => {
      const handleHover = () => this.toggleRubberBand(index);
      this.hoverHandlers.push([letter, handleHover]);
      letter.addEventListener("mouseover", handleHover);
    });
  };

  toggleRubberBand = (id) => {
    const letter = this.bouncyList && this.bouncyList[id];
    if (!letter) return;

    letter.classList.add("bouncing");
    const handleEnd = () => {
      letter.classList.remove("bouncing");
      letter.removeEventListener("animationend", handleEnd);
    };
    letter.addEventListener("animationend", handleEnd);
  };

  render() {
    const { mode, headerTextHighlightRef } = this.props;
    const { comeFromBelow, visible } = this.state;

    if (mode === "mobile") {
      return (
        <div className={`skillsPage--title ${comeFromBelow} ${visible}`} id="skills-title">
          <h2 ref={headerTextHighlightRef} aria-label="Skills">
            <span className="text-wrapper" aria-hidden="true">
              <span className="letter skillsPageBouncy">S</span>
              <span className="letter skillsPageBouncy">k</span>
              <span className="letter skillsPageBouncy">i</span>
              <span className="letter skillsPageBouncy">l</span>
              <span className="letter skillsPageBouncy">l</span>
              <span className="letter skillsPageBouncy">s</span>
            </span>
          </h2>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`skillsPage--title ${comeFromBelow} ${visible}`} id="skills-title">
        <h2 ref={headerTextHighlightRef} aria-label="Skills">
          &nbsp;
          <span className="text-wrapper" aria-hidden="true">
            <span className="letter skillsPageBouncy">S</span>
            <span className="letter skillsPageBouncy">k</span>
            <span className="letter skillsPageBouncy">i</span>
            <span className="letter skillsPageBouncy">l</span>
            <span className="letter skillsPageBouncy">l</span>
            <span className="letter skillsPageBouncy">s</span>
          </span>
        </h2>
      </div>
    );
  }
}

SkillsTitle.propTypes = {
  mode: PropTypes.oneOf(["mobile", "desktop"]).isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};

export default SkillsTitle;
