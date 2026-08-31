/* eslint-disable class-methods-use-this */

import React from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import AboutMe from "./components/AboutMe/AboutMe";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import ContactMe from "./components/ContactMe/ContactMe";
import Footer from "./components/Footer/Footer";
import PrintCV from "./components/PrintCV/PrintCV";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function scroll(target) {
  const element = document.querySelector(target);
  if (!element) return;

  // The document itself does not scroll: `html` has overflow-x: hidden with a
  // constrained height, which leaves `body` as the scroll container. That makes
  // window.scrollTo a no-op here, because it drives document.scrollingElement
  // (`html`). scrollIntoView resolves the real scroller on its own, and the
  // header offset comes from scroll-margin-top in index.css.
  element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <>
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

        <Footer />
        <ScrollReveal />
      </div>

      {/* Hidden on screen; the only thing that renders when printing. */}
      <PrintCV />
    </>
  );
}
