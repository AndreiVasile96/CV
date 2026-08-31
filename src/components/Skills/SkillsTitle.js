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
      visible: "invisible",
      isTitleVisible: false
    };
    this.bouncyList = null;
    this.hoverHandlers = [];
  }

  componentDidMount() {
    // Initialize bouncy list after component mounts
    this.bouncyList = document.querySelectorAll(".skillsPageBouncy");
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation, isTitleVisible } = this.state;

    if (refinview === "skills" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        renderAnimation: true,
        visible: "visible"
      });
    }

    // Add bouncy animation when component becomes visible
    if (refinview === "skills" && !isTitleVisible) {
      this.initializeBouncyAnimation();
      this.setState({ isTitleVisible: true });
    }
  }

  componentWillUnmount() {
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

    // Animate letters on load - faster animation
    anime.timeline({ loop: false }).add({
      targets: ".skillsPageBouncy",
      scale: [0, 1],
      duration: 200, // Reduced from 1500ms to 800ms
      elasticity: 600,
      delay: (el, i) => 80 * (i + 1) // Reduced from 150ms to 80ms
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
          <h2 ref={headerTextHighlightRef}>
            <span className="text-wrapper">
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
        <h2 ref={headerTextHighlightRef}>
          &nbsp;
          <span className="text-wrapper">
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
