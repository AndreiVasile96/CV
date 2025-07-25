import React from "react";
import Skills from "../components/Skills/Skills";

export default {
  title: "CV/Skills",
  component: Skills
};

export function Default() {
  return <Skills refinview="skills" headerTextHighlightRef={React.createRef()} scroll={() => {}} />;
}
