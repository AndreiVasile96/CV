import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";

import "./ContactMe.scss";

class ContactMeTitle extends React.Component {
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
    this.bouncyList = document.querySelectorAll(".contactMeBouncy");
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation, isTitleVisible } = this.state;

    if (refinview === "contactMe" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        renderAnimation: true,
        visible: "visible"
      });
    }

    // Add bouncy animation when component becomes visible
    if (refinview === "contactMe" && !isTitleVisible) {
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
      targets: ".contactMeBouncy",
      scale: [0, 1],
      duration: 200, // Reduced from 1500ms to 800ms
      elasticity: 600,
      delay: (el, i) => 80 * (i + 1) // Reduced from 150ms to 80ms
    });

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".contactMeBouncy");
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
        <div className={`contactMe--title ${comeFromBelow} ${visible}`} id="contact-title">
          <h2 ref={headerTextHighlightRef}>
            <span className="text-wrapper">
              <span className="letter contactMeBouncy">C</span>
              <span className="letter contactMeBouncy">o</span>
              <span className="letter contactMeBouncy">n</span>
              <span className="letter contactMeBouncy">t</span>
              <span className="letter contactMeBouncy">a</span>
              <span className="letter contactMeBouncy">c</span>
              <span className="letter contactMeBouncy">t</span>
              <span className="letter contactMeBouncy">&nbsp;</span>
              <span className="letter contactMeBouncy">m</span>
              <span className="letter contactMeBouncy">e</span>
            </span>
          </h2>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`contactMe--title ${comeFromBelow} ${visible}`} id="contact-title">
        <h2 ref={headerTextHighlightRef}>
          &nbsp;
          <span className="text-wrapper">
            <span className="letter contactMeBouncy">C</span>
            <span className="letter contactMeBouncy">o</span>
            <span className="letter contactMeBouncy">n</span>
            <span className="letter contactMeBouncy">t</span>
            <span className="letter contactMeBouncy">a</span>
            <span className="letter contactMeBouncy">c</span>
            <span className="letter contactMeBouncy">t</span>
            <span className="letter contactMeBouncy">&nbsp;</span>
            <span className="letter contactMeBouncy">m</span>
            <span className="letter contactMeBouncy">e</span>
          </span>
        </h2>
      </div>
    );
  }
}

ContactMeTitle.propTypes = {
  mode: PropTypes.oneOf(["mobile", "desktop"]).isRequired,
  headerTextHighlightRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};

export default ContactMeTitle;
