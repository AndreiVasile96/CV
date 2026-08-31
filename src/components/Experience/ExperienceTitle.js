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
    this.hoverHandlers = [];
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
      targets: ".experienceBouncy",
      scale: [0, 1],
      duration: 200, // Reduced from 1500ms to 800ms
      elasticity: 600,
      delay: (el, i) => 80 * (i + 1) // Reduced from 150ms to 80ms
    });

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".experienceBouncy");
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
        <div className={`experience--title ${comeFromBelow} ${visible}`} id="experience-title">
          <h2 ref={headerTextHighlightRef}>
            <span className="text-wrapper">
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
            </span>
          </h2>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`experience--title ${comeFromBelow} ${visible}`} id="experience-title">
        <h2 ref={headerTextHighlightRef}>
          &nbsp;
          <span className="text-wrapper">
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
          </span>
        </h2>
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
