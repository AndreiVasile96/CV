/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";

import AVLogo from "../../assets/logos/VANDREI-logo.svg";

import VTriangle from "../../assets/icons/V-Triangle.svg";
import ATriangle from "../../assets/icons/Crop-Bold-A-Triangle.svg";

import "./Header.scss";

export default function Header(props) {
  const { scroll, refinview } = props;
  const [menuState, setMenuState] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [borderGlowing, setBorderGlowing] = useState(false);
  const [headerClosing, setHeaderClosing] = useState(false);

  const handleMenuToggle = () => {
    if (menuState) {
      // If menu is open, start closing animation
      setIsClosing(true);
      setHeaderClosing(true); // Start header closing animation
      setBorderGlowing(false); // Reset border glow
      setTimeout(() => {
        setMenuState(false);
        setIsClosing(false);
        setHeaderClosing(false); // Reset header closing state
      }, 300); // Increased to allow closing animation to complete
    } else {
      // If menu is closed, start border glow first (quicker)
      setBorderGlowing(true);
      setHeaderClosing(false); // Reset header closing state
      setTimeout(() => {
        setMenuState(true);
        setIsClosing(false);
        // Fade border glow after menu appears (quicker)
        setTimeout(() => {
          setBorderGlowing(false);
        }, 200); // Reduced from 400ms
      }, 50); // Reduced from 100ms for quicker response
    }
  };

  const handleMenuItemClick = (scrollTarget, currentSection) => {
    if (refinview !== currentSection) {
      // Start closing animation
      setIsClosing(true);
      setHeaderClosing(true); // Start header closing animation
      setBorderGlowing(false); // Reset border glow
      setTimeout(() => {
        scroll(scrollTarget);
        setMenuState(false);
        setIsClosing(false);
        setHeaderClosing(false); // Reset header closing state
      }, 300); // Increased to allow closing animation to complete
    }
  };

  return (
    <div className="header landingPage--name-popin">
      <MediaQuery maxWidth={912}>
        <div className={`header--body ${menuState ? "header--body--menu-open" : ""} ${borderGlowing ? "header--body--border-glow" : ""} ${headerClosing ? "header--body--closing" : ""}`}>
          <button
            type="button"
            className="header--burger-menu-btn"
            onClick={() => scroll("#landingPage")}
          >
            <img className="header--logo" src={AVLogo} alt="AV Logo" />
          </button>
          <button
            type="button"
            className="header--burger-menu-btn"
            onClick={handleMenuToggle}
          >
            {menuState ? (
              <img
                className="header--burger-menu-collapsed"
                src={ATriangle}
                alt="X Burger Logo"
              />
            ) : (
              <img
                className="header--burger-menu"
                src={VTriangle}
                alt="Burger Logo"
              />
            )}
          </button>
        </div>
        {menuState ? (
          <div className={`header--modal-body ${isClosing ? "header--modal-body--closing" : ""}`}>
            <section className="header--modal-menu">
              <div className="header--modal-title">
                <h1>
                  <img
                    className="header--triangle"
                    src={ATriangle}
                    alt="A triangle"
                  />
                  ndrei
                  &nbsp;
                  <img
                    className="header--triangle header--triangle--v"
                    src={VTriangle}
                    alt="A triangle"
                  />
                  asile
                </h1>
              </div>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                disabled={refinview === "landingPage"}
                onClick={() => handleMenuItemClick("#landingPage", "landingPage")}
              >
                <h3 className={`header--modal-item ${refinview === "landingPage" ? "header--modal-item--active" : ""}`}>
                  Introduction
                </h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                disabled={refinview === "aboutMe"}
                onClick={() => handleMenuItemClick("#about-title", "aboutMe")}
              >
                <h3 className={`header--modal-item ${refinview === "aboutMe" ? "header--modal-item--active" : ""}`}>
                  About me
                </h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                disabled={refinview === "skills"}
                onClick={() => handleMenuItemClick("#skills-title", "skills")}
              >
                <h3 className={`header--modal-item ${refinview === "skills" ? "header--modal-item--active" : ""}`}>
                  Skills
                </h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                disabled={refinview === "experience"}
                onClick={() => handleMenuItemClick("#experience-title", "experience")}
              >
                <h3 className={`header--modal-item ${refinview === "experience" ? "header--modal-item--active" : ""}`}>
                  Experience
                </h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                disabled={refinview === "contactMe"}
                onClick={() => handleMenuItemClick("#contact-title", "contactMe")}
              >
                <h3 className={`header--modal-item ${refinview === "contactMe" ? "header--modal-item--active" : ""}`}>
                  Contact me
                </h3>
              </button>
              <div className="header--modal-bar" />
              {/* <div className="header--modal-social">
                <a
                  href="https://github.com/AndreiVasile96/CV"
                  className="header--modal-social-link"
                  aria-label="Visit GitHub profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={githubLogo}
                    alt="GitHub"
                    className="header--modal-social-logo"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/andrei-vasile/"
                  className="header--modal-social-link"
                  aria-label="Visit LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedinLogo}
                    alt="LinkedIn"
                    className="header--modal-social-logo"
                  />
                </a>
              </div> */}
            </section>
          </div>
        ) : null}
      </MediaQuery>
      <MediaQuery minWidth={913}>
        <div className="header--body--desktop">
          <div>
            <button
              type="button"
              className="header--burger-menu-btn"
              onClick={() => scroll("#landingPage")}
            >
              <h1 className="header--name-logo">
                <img
                  className="header--triangle-element"
                  src={ATriangle}
                  alt="A triangle"
                />
                ndrei &nbsp;
                <img
                  className="header--triangle-element header--triangle-element--v"
                  src={VTriangle}
                  alt="V triangle"
                />
                asile
              </h1>
            </button>
          </div>
          <div className="header--links-group" style={{ marginRight: "2rem" }}>
            <div className="header--group-item">
              <button
                type="button"
                className={`invisible--buton header--group-item-text " ${
                  refinview === "aboutMe" ? "cyan-text" : null
                }`}
                onClick={() => scroll("#about-title")}
              >
                About me
              </button>
            </div>
            <div className="header--group-item">
              <button
                type="button"
                className={`invisible--buton header--group-item-text " ${
                  refinview === "skills" ? "cyan-text" : null
                }`}
                onClick={() => scroll("#skills-title")}
              >
                Skills
              </button>
            </div>
            <div className="header--group-item">
              <button
                type="button"
                className={`invisible--buton header--group-item-text " ${
                  refinview === "experience" ? "cyan-text" : null
                }`}
                onClick={() => scroll("#experience-title")}
              >
                Experience
              </button>
            </div>
            <div className="header--group-item">
              <button
                type="button"
                className={`invisible--buton header--group-item-text " ${
                  refinview === "contactMe" ? "cyan-text" : null
                }`}
                onClick={() => scroll("#contact-title")}
              >
                Contact me
              </button>
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

Header.propTypes = {
  scroll: PropTypes.func.isRequired,
  refinview: PropTypes.string.isRequired
};
