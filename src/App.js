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

  let refInView = "none";
  if (isLandingVisible) refInView = "landingPage";
  else if (isaboutMeVisible) refInView = "aboutMe";
  else if (isskillsVisible) refInView = "skills";
  else if (isexperienceVisible) refInView = "experience";
  else if (iscontactMeVisible) refInView = "contactMe";

  return (
    <div className="appBody">
      <Header scroll={scroll} refInView={refInView} />
      <LandingPage
        scroll={scroll}
        headerTextHighlightRef={landingRef}
        refInView={refInView}
      />
      <AboutMe headerTextHighlightRef={aboutMeRef} refInView={refInView} />
      <Skills headerTextHighlightRef={skillsRef} refInView={refInView} />
      <Experience
        headerTextHighlightRef={experienceRef}
        refInView={refInView}
      />
      <ContactMe headerTextHighlightRef={contactMeRef} refInView={refInView} />
    </div>
  );
}
