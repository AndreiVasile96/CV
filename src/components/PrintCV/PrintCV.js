import React from "react";

import contactData from "../../data/contactMe.json";
import aboutData from "../../data/aboutMe.json";
import workData from "../../data/work.json";
import educationData from "../../data/education.json";
import skillsData from "../../data/skills.json";

import "./PrintCV.scss";

/**
 * A print-only CV.
 *
 * The screen design is dark, animated, and hides content behind scroll reveals
 * and click-to-expand cards. Restyling that DOM for paper produced a poor
 * document, so the printed CV is its own compact layout instead. It reads the
 * same JSON as the site, so the two cannot drift apart.
 *
 * Hidden on screen and revealed only inside `@media print` - see PrintCV.scss.
 */
export default function PrintCV() {
  const { details } = contactData;

  return (
    <article className="print-cv" aria-hidden="true">
      <header className="print-cv--header">
        <h1 className="print-cv--name">{details.name}</h1>
        <p className="print-cv--title">{details.title}</p>
        <p className="print-cv--contact">
          {[
            details.email,
            details.location,
            details.website,
            details.linkedin,
            details.github
          ].join("  ·  ")}
        </p>
      </header>

      <section className="print-cv--section">
        <h2 className="print-cv--heading">Profile</h2>
        <p className="print-cv--profile">{aboutData.description.desktop.join(" ")}</p>
      </section>

      <section className="print-cv--section">
        <h2 className="print-cv--heading">Experience</h2>
        {workData.map((role) => (
          <div className="print-cv--role" key={`role-${role.id}`}>
            <div className="print-cv--role-head">
              <span className="print-cv--role-title">
                {role.title}
                {" — "}
                {role.subtitle}
              </span>
              <span className="print-cv--role-date">{role.date.replace(/[()]/g, "")}</span>
            </div>
            <ul className="print-cv--bullets">
              {role.summary.map((point) => (
                <li key={`${role.id}-${point.slice(0, 24)}`}>{point}</li>
              ))}
            </ul>
            <p className="print-cv--detail">{role.details}</p>
          </div>
        ))}
      </section>

      <section className="print-cv--section">
        <h2 className="print-cv--heading">Skills</h2>
        <div className="print-cv--skills">
          {skillsData.categories.map((category) => (
            <div className="print-cv--skill-group" key={category.id}>
              <span className="print-cv--skill-category">{category.title}</span>
              <span className="print-cv--skill-list">
                {category.skills.map((s) => s.name).join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="print-cv--section">
        <h2 className="print-cv--heading">Education</h2>
        {educationData.map((item) => (
          <div className="print-cv--role" key={`edu-${item.id}`}>
            <div className="print-cv--role-head">
              <span className="print-cv--role-title">
                {item.title}
                {" — "}
                {item.subtitle}
              </span>
              <span className="print-cv--role-date">{item.date.replace(/[()]/g, "")}</span>
            </div>
            <ul className="print-cv--bullets">
              {item.summary.map((point) => (
                <li key={`${item.id}-${point.slice(0, 24)}`}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </article>
  );
}
