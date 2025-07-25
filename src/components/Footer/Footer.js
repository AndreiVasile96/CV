import React from "react";
import PropTypes from "prop-types";

import linkedinLogo from "../../assets/logos/LinkedinLogo.svg";
import githubLogo from "../../assets/logos/GithubLogo.svg";

import "./Footer.scss";

export default function Footer({ scroll }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer--container">
        {/* Top section with signature */}
        <div className="footer--top">
          <div className="footer--signature">
            {/* CTA Section */}
            <div className="footer--cta">
              <h3>Ready to collaborate?</h3>
              <p>
                I
                &apos;
                m always open to discussing new opportunities and exciting projects.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer--bottom">
          <div className="footer--social">
            <a
              href="https://github.com/AndreiVasile96/CV"
              className="footer--github"
              aria-label="Visit GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubLogo}
                alt="GitHub"
                className="footer--github-logo"
                style={{
                  width: "48px",
                  height: "48px"
                }}
              />
            </a>
            <button
              type="button"
              className="footer--back-to-top"
              onClick={() => scroll("#landingPage")}
              aria-label="Back to top"
              style={{ margin: "0 2rem" }}
            >
              ↑
            </button>
            <a
              href="https://www.linkedin.com/in/andrei-vasile/"
              className="footer--linkedin"
              aria-label="Visit LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                className="footer--linkedin-logo"
                style={{
                  width: "48px",
                  height: "48px"
                }}
              />
            </a>
          </div>

          <div className="footer--info">
            <span className="footer--built-with">
              ©
              {currentYear}
              &nbsp;
              Andrei Vasile. Crafted with passion and precision.
            </span>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="footer--decoration">
          <div className="footer--decoration-line" />
          <div className="footer--decoration-dot" />
          <div className="footer--decoration-line" />
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  scroll: PropTypes.func.isRequired
};
