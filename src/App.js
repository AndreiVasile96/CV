/* eslint-disable class-methods-use-this */

import React from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import AboutMe from "./components/AboutMe/AboutMe";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import ContactMe from "./components/ContactMe/ContactMe";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function scroll(target) {
  const element = document.querySelector(target);
  element.scrollIntoViewIfNeeded();
}

export default function App() {
  const { ref: landingRef, inView: isLandingVisible } = useInView();
  const { ref: aboutMeRef, inView: isaboutMeVisible } = useInView();
  const { ref: skillsRef, inView: isskillsVisible } = useInView();
  const { ref: experienceRef, inView: isexperienceVisible } = useInView();
  const { ref: contactMeRef, inView: iscontactMeVisible } = useInView();

  let whatToHighlight = "none";
  if (isLandingVisible) whatToHighlight = "landingPage";
  else if (isaboutMeVisible) whatToHighlight = "aboutMe";
  else if (isskillsVisible) whatToHighlight = "skills";
  else if (isexperienceVisible) whatToHighlight = "experience";
  else if (iscontactMeVisible) whatToHighlight = "contactMe";

  return (
    <div className="appBody">
      <Header scroll={scroll} whatToHighlight={whatToHighlight} />
      <LandingPage scroll={scroll} headerTextHighlightRef={landingRef} />
      <AboutMe headerTextHighlightRef={aboutMeRef} />
      <Skills headerTextHighlightRef={skillsRef} />
      <Experience headerTextHighlightRef={experienceRef} />
      <ContactMe headerTextHighlightRef={contactMeRef} />
    </div>
  );
}
