/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";

import AVLogo from "./Logo.svg";
import BurgerMenu from "./BurgerMenu.svg";
import XBurgerMenu from "./X-BurgerMenu.svg";

import VTriangle from "./V-Triangle.svg";
import ATriangle from "./A-Triangle.svg";
import linkedinLogo from "./LinkedinLogo.svg";

import "./Header.scss";

export default function Header(props) {
  const { scroll, refinview } = props;
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="header landingPage--name-popin">
      <MediaQuery maxWidth={912}>
        <div className="header--body">
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
            onClick={() => setMenuState(!menuState)}
          >
            {menuState ? (
              <img
                className="header--burger-menu-collapsed"
                src={XBurgerMenu}
                alt="X Burger Logo"
              />
            ) : (
              <img
                className="header--burger-menu"
                src={BurgerMenu}
                alt="Burger Logo"
              />
            )}
          </button>
        </div>
        {menuState ? (
          <div className="header--modal-body">
            <section className="header--modal-menu">
              <div className="header--modal-title">
                <h1>
                  <img
                    className="header--triangle"
                    src={ATriangle}
                    alt="A triangle"
                  />
                  ndrei
                </h1>
                <h1>
                  <img
                    className="header--triangle"
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
                onClick={() => {
                  scroll("#landingPage");
                  setMenuState(!menuState);
                }}
              >
                <h3 className="header--modal-item">Introduction</h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                onClick={() => {
                  scroll("#about");
                  setMenuState(!menuState);
                }}
              >
                <h3 className="header--modal-item">About me</h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                onClick={() => {
                  scroll("#skills");
                  setMenuState(!menuState);
                }}
              >
                <h3 className="header--modal-item">Skills</h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                onClick={() => {
                  scroll("#experience");
                  setMenuState(!menuState);
                }}
              >
                <h3 className="header--modal-item">Experience</h3>
              </button>
              <div className="header--modal-bar" />
              <button
                type="button"
                className="header--burger-menu-btn"
                onClick={() => {
                  scroll("#contact");
                  setMenuState(!menuState);
                }}
              >
                <h3 className="header--modal-item">Contact me</h3>
              </button>
              <div className="header--modal-bar" />
              <a href="https://www.linkedin.com/in/andrei-vasile/">
                <img
                  className="header--modal-ldkn-logo"
                  src={linkedinLogo}
                  alt="Linkedin Logo"
                />
              </a>
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
                  className="header--triangle-element"
                  src={VTriangle}
                  alt="V triangle"
                />
                asile
              </h1>
            </button>
          </div>
          <div className="header--links-group">
            <div className="header--group-item">
              <button
                type="button"
                className={`invisible--buton header--group-item-text " ${
                  refinview === "aboutMe" ? "cyan-text" : null
                }`}
                onClick={() => scroll("#about")}
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
                onClick={() => scroll("#skills")}
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
                onClick={() => scroll("#experience")}
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
                onClick={() => scroll("#contact")}
              >
                Contact me
              </button>
            </div>

            <div className="header--group-item">
              <button type="button" className="invisible--buton">
                <a href="https://www.linkedin.com/in/andrei-vasile/">
                  <img
                    src={linkedinLogo}
                    alt="Linkeding logo"
                    className="header--group-item-logo"
                  />
                </a>
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
