import React from "react";
import ContactMe from "../components/ContactMe/ContactMe";

export default {
  title: "CV/ContactMe",
  component: ContactMe
};

export function Default() {
  return <ContactMe refinview="contactMe" headerTextHighlightRef={React.createRef()} />;
}
