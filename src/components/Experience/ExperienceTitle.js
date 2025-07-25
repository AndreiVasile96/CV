import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";

class ExperienceTitle extends React.Component {
  constructor() {
    super();
    this.state = {
      renderAnimation: false,
      comeFromBelow: "",
      visible: "invisible",
      isTitleVisible: false
    };
    this.bouncyList = null;
  }

  componentDidMount() {
    // Initialize bouncy list after component mounts
    this.bouncyList = document.querySelectorAll(".experienceBouncy");
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation, isTitleVisible } = this.state;

    if (refinview === "experience" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        renderAnimation: true,
        visible: "visible"
      });
    }

    // Add bouncy animation when component becomes visible
    if (refinview === "experience" && !isTitleVisible) {
      this.initializeBouncyAnimation();
      this.setState({ isTitleVisible: true });
    }
  }

  initializeBouncyAnimation = () => {
    // Animate letters on load - faster animation
    anime.timeline({ loop: false }).add({
      targets: ".experienceBouncy",
      scale: [0, 1],
      duration: 200, // Reduced from 1500ms to 800ms
      elasticity: 600,
      delay: (el, i) => 80 * (i + 1) // Reduced from 150ms to 80ms
    });

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".experienceBouncy");
    this.bouncyList.forEach((letter, index) => {
      letter.addEventListener("mouseover", () => this.toggleRubberBand(index));
    });
  };

  toggleRubberBand = (id) => {
    if (this.bouncyList && this.bouncyList[id]) {
      this.bouncyList[id].classList.add("bouncing");
      this.bouncyList[id].addEventListener("animationend", () => {
        this.bouncyList[id].classList.remove("bouncing");
      });
    }
  };

  render() {
    const { mode, headerTextHighlightRef } = this.props;
    const { comeFromBelow, visible } = this.state;

    if (mode === "mobile") {
      return (
        <div className={`experience--title ${comeFromBelow} ${visible}`} id="experience-title">
          <h1 ref={headerTextHighlightRef}>
            <div className="text-wrapper">
              <span className="letter experienceBouncy">E</span>
              <span className="letter experienceBouncy">x</span>
              <span className="letter experienceBouncy">p</span>
              <span className="letter experienceBouncy">e</span>
              <span className="letter experienceBouncy">r</span>
              <span className="letter experienceBouncy">i</span>
              <span className="letter experienceBouncy">e</span>
              <span className="letter experienceBouncy">n</span>
              <span className="letter experienceBouncy">c</span>
              <span className="letter experienceBouncy">e</span>
            </div>
          </h1>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`experience--title ${comeFromBelow} ${visible}`} id="experience-title">
        <h1 ref={headerTextHighlightRef}>
          &nbsp;
          <div className="text-wrapper">
            <span className="letter experienceBouncy">E</span>
            <span className="letter experienceBouncy">x</span>
            <span className="letter experienceBouncy">p</span>
            <span className="letter experienceBouncy">e</span>
            <span className="letter experienceBouncy">r</span>
            <span className="letter experienceBouncy">i</span>
            <span className="letter experienceBouncy">e</span>
            <span className="letter experienceBouncy">n</span>
            <span className="letter experienceBouncy">c</span>
            <span className="letter experienceBouncy">e</span>
          </div>
        </h1>
      </div>
    );
  }
}

ExperienceTitle.propTypes = {
  mode: PropTypes.oneOf(["mobile", "desktop"]).isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};

export default ExperienceTitle;
