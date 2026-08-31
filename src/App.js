/* eslint-disable class-methods-use-this */

import React from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import AboutMe from "./components/AboutMe/AboutMe";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import ContactMe from "./components/ContactMe/ContactMe";
import Footer from "./components/Footer/Footer"; // Add this import

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

// Roughly the header height (10rem), so a section does not land underneath it.
const HEADER_OFFSET = 160;

function scroll(target) {
  const element = document.querySelector(target);
  if (!element) return;

  // Resolve the element's absolute position and subtract the header in one go,
  // rather than scrolling twice and racing a timeout against the smooth scroll.
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: Math.max(0, elementTop - HEADER_OFFSET),
    behavior: "smooth"
  });
}

export default function App() {
  const { ref: landingRef, inView: isLandingVisible } = useInView();
  const { ref: aboutMeRef, inView: isaboutMeVisible } = useInView();
  const { ref: skillsRef, inView: isskillsVisible } = useInView();
  const { ref: experienceRef, inView: isexperienceVisible } = useInView();
  const { ref: contactMeRef, inView: iscontactMeVisible } = useInView();

  let refinview = "none";
  if (isLandingVisible) refinview = "landingPage";
  else if (isaboutMeVisible) refinview = "aboutMe";
  else if (isskillsVisible) refinview = "skills";
  else if (isexperienceVisible) refinview = "experience";
  else if (iscontactMeVisible) refinview = "contactMe";

  return (
    <div className="appBody">
      <Header scroll={scroll} refinview={refinview} />

      <LandingPage
        scroll={scroll}
        headerTextHighlightRef={landingRef}
        refinview={refinview}
      />
      <AboutMe aboutMeRef={aboutMeRef} refinview={refinview} />
      <Skills
        headerTextHighlightRef={skillsRef}
        refinview={refinview}
        scroll={scroll}
      />
      <Experience
        headerTextHighlightRef={experienceRef}
        refinview={refinview}
      />
      <ContactMe headerTextHighlightRef={contactMeRef} refinview={refinview} />

      {/* Add the Footer component */}
      <Footer scroll={scroll} />
    </div>
  );
}
