import React from "react";

import linkedinLogo from "../../assets/logos/LinkedinLogo.svg";
import githubLogo from "../../assets/logos/New-GithubLogo.svg";

import "./Footer.scss";

/**
 * Footer.
 *
 * Ordered deliberately: the invitation, then one row pairing the profile links
 * with the thing a recruiter is most likely to want (the CV), then the small
 * print. A back-to-top control used to sit between the two social icons, where
 * it read as a third social link; the header logo already returns to the top,
 * so it was removed rather than restyled.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer--container">
        <div className="footer--divider" aria-hidden="true" />

        <div className="footer--cta">
          <h3>Ready to collaborate?</h3>
          <p>
            I
            &apos;
            m always open to discussing new opportunities and exciting projects.
          </p>
        </div>

        {/* One row: profiles either side of the primary action. */}
        <div className="footer--social">
          <a
            href="https://github.com/AndreiVasile96"
            className="footer--github"
            aria-label="Visit GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="GitHub" className="footer--github-logo" />
          </a>
          <button
            type="button"
            className="main-btn-style footer--download-btn cv-print-hide"
            onClick={() => window.print()}
          >
            Download CV
          </button>
          <a
            href="https://www.linkedin.com/in/andrei-vasile/"
            className="footer--linkedin"
            aria-label="Visit LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="footer--linkedin-logo" />
          </a>
        </div>

        <div className="footer--info">
          <span className="footer--built-with">
            ©
            &nbsp;
            {currentYear}
            &nbsp;
            Andrei Vasile. Crafted with passion and precision.
          </span>
        </div>
      </div>
    </footer>
  );
}
