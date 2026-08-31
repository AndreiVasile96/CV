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
      visible: "invisible"
    };
    this.bouncyList = null;
    this.hoverHandlers = [];
    this.titleObserver = null;
    this.observerDriven = false;
  }

  componentDidMount() {
    this.bouncyList = document.querySelectorAll(".aboutMeBouncy");
    this.triangleElement = document.querySelector(".aboutMe--ATriangle");

    // Collapse the letters up front. anime.js applies the `scale: [0, 1]`
    // start value on its first animation frame, which is one paint after the
    // title becomes visible - so the title appeared fully formed, vanished,
    // then animated in. Setting the start state here happens in the same
    // commit, so that frame never renders.
    this.bouncyList.forEach((letter) => {
      // eslint-disable-next-line no-param-reassign
      letter.style.transform = "scale(0)";
    });
    if (this.triangleElement) this.triangleElement.style.transform = "scale(0)";

    // Trigger on the title entering the viewport rather than on the section.
    // The section reports in view long before the title is on screen, so on
    // tall mobile layouts the animation played off-screen and was over by the
    // time the title arrived.
    const title = document.querySelector("#about-title");
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

    if (!this.observerDriven && refinview === "aboutMe" && !renderAnimation) {
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

    // Animate letters on load - faster animation
    anime.timeline({ loop: false }).add({
      targets: ".aboutMeBouncy",
      scale: [0, 1],
      duration: 520,
      easing: "easeOutElastic(1, 0.6)",
      delay: (el, i) => 55 * (i + 1)
    }).add({
      // Animate triangle with the letters
      targets: ".aboutMe--ATriangle",
      scale: [0, 1],
      duration: 520,
      easing: "easeOutElastic(1, 0.6)",
      delay: 0 // Triangle appears first
    }, 0); // Start at the same time as letters

    // Add hover effects to each letter
    this.bouncyList = document.querySelectorAll(".aboutMeBouncy");
    this.bouncyList.forEach((letter, index) => {
      const handleHover = () => this.toggleRubberBand(index);
      this.hoverHandlers.push([letter, handleHover]);
      letter.addEventListener("mouseover", handleHover);
    });

    // Add hover effect to triangle
    this.triangleElement = document.querySelector(".aboutMe--ATriangle");
    if (this.triangleElement) {
      this.triangleElement.addEventListener("mouseover", () => this.toggleTriangleRubberBand());
    }
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
          <h2 ref={aboutMeRef} aria-label="About me">
            <img
              className="aboutMe--ATriangle aboutMe--ATriangle-mobile"
              src={ATriangle}
              alt=""
            />
            <span className="text-wrapper" aria-hidden="true">
              <span className="letter aboutMeBouncy">b</span>
              <span className="letter aboutMeBouncy">o</span>
              <span className="letter aboutMeBouncy">u</span>
              <span className="letter aboutMeBouncy">t</span>
              <span className="letter aboutMeBouncy">&nbsp;</span>
              <span className="letter aboutMeBouncy">m</span>
              <span className="letter aboutMeBouncy">e</span>
            </span>
          </h2>
        </div>
      );
    }

    // Desktop mode
    return (
      <div className={`aboutMe--title ${comeFromBelow} ${visible}`} id="about-title">
        <h2 ref={aboutMeRef} aria-label="About me">
          <img
            className="aboutMe--ATriangle"
            src={ATriangle}
            alt=""
          />
          &nbsp;
          <span className="text-wrapper" aria-hidden="true">
            <span className="letter aboutMeBouncy">b</span>
            <span className="letter aboutMeBouncy">o</span>
            <span className="letter aboutMeBouncy">u</span>
            <span className="letter aboutMeBouncy">t</span>
            <span className="letter aboutMeBouncy">&nbsp;</span>
            <span className="letter aboutMeBouncy">m</span>
            <span className="letter aboutMeBouncy">e</span>
          </span>
        </h2>
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
