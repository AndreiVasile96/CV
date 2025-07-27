import React from "react";
import PropTypes from "prop-types";
import anime from "animejs";

// import ATriangle from "../../assets/icons/A-Triangle.svg";
import ATriangle from "../../assets/icons/Crop-Bold-A-Triangle.svg";
import "./AboutMe.scss";

class AboutMeTitle extends React.Component {
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
    this.bouncyList = document.querySelectorAll(".aboutMeBouncy");
    this.triangleElement = document.querySelector(".aboutMe--ATriangle");
  }

  componentDidUpdate() {
    const { refinview } = this.props;
    const { renderAnimation, isTitleVisible } = this.state;

    if (refinview === "aboutMe" && !renderAnimation) {
      this.setState({
        comeFromBelow: "come-from-below",
        renderAnimation: true,
        visible: "visible"
      });
    }

    // Add bouncy animation when component becomes visible
    if (refinview === "aboutMe" && !isTitleVisible) {
      this.initializeBouncyAnimation();
      this.setState({ isTitleVisible: true });
    }
  }

  initializeBouncyAnimation = () => {
    // Animate letters on load - faster animation
    anime.timeline({ loop: false }).add({
      targets: ".aboutMeBouncy",
      scale: [0, 1],
      duration: 200, // Reduced from 1500ms to 800ms
      elasticity: 600,
      delay: (el, i) => 80 * (i + 1) // Reduced from 150ms to 80ms
    }).add({
      // Animate triangle with the letters
      targets: ".aboutMe--ATriangle",
      scale: [0, 1],
      duration: 200,
      elasticity: 600,
      delay: 0 // Triangle appears first
    }, 0); // Start at the same time as letters

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".aboutMeBouncy");
    this.bouncyList.forEach((letter, index) => {
      letter.addEventListener("mouseover", () => this.toggleRubberBand(index));
    });

    // Add hover effect to triangle
    this.triangleElement = document.querySelector(".aboutMe--ATriangle");
    if (this.triangleElement) {
      this.triangleElement.addEventListener("mouseover", () => this.toggleTriangleRubberBand());
    }
  };

  toggleRubberBand = (id) => {
    if (this.bouncyList && this.bouncyList[id]) {
      this.bouncyList[id].classList.add("bouncing");
      this.bouncyList[id].addEventListener("animationend", () => {
        this.bouncyList[id].classList.remove("bouncing");
      });
    }
  };

  toggleTriangleRubberBand = () => {
    if (this.triangleElement) {
      this.triangleElement.classList.add("bouncing");
      this.triangleElement.addEventListener("animationend", () => {
        this.triangleElement.classList.remove("bouncing");
      });
    }
  };

  render() {
    const { mode, aboutMeRef } = this.props;
    const { comeFromBelow, visible } = this.state;

    if (mode === "mobile") {
      return (
        <div className={`aboutMe--title ${comeFromBelow} ${visible}`} id="about-title">
          <h1 ref={aboutMeRef}>
            <img
              className="aboutMe--ATriangle aboutMe--ATriangle-mobile"
              src={ATriangle}
              alt="A triangle"
            />
            <div className="text-wrapper">
              <span className="letter aboutMeBouncy">b</span>
              <span className="letter aboutMeBouncy">o</span>
              <span className="letter aboutMeBouncy">u</span>
              <span className="letter aboutMeBouncy">t</span>
              <span className="letter aboutMeBouncy">&nbsp;</span>
              <span className="letter aboutMeBouncy">m</span>
              <span className="letter aboutMeBouncy">e</span>
            </div>
          </h1>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`aboutMe--title ${comeFromBelow} ${visible}`} id="about-title">
        <h1 ref={aboutMeRef}>
          <img
            className="aboutMe--ATriangle"
            src={ATriangle}
            alt="A triangle"
          />
          &nbsp;
          <div className="text-wrapper">
            <span className="letter aboutMeBouncy">b</span>
            <span className="letter aboutMeBouncy">o</span>
            <span className="letter aboutMeBouncy">u</span>
            <span className="letter aboutMeBouncy">t</span>
            <span className="letter aboutMeBouncy">&nbsp;</span>
            <span className="letter aboutMeBouncy">m</span>
            <span className="letter aboutMeBouncy">e</span>
          </div>
        </h1>
      </div>
    );
  }
}

AboutMeTitle.propTypes = {
  mode: PropTypes.oneOf(["mobile", "desktop"]).isRequired,
  aboutMeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  refinview: PropTypes.string.isRequired
};

export default AboutMeTitle;
