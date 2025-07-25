import React from "react";
import Header from "../components/Header/Header";

export default {
  title: "CV/Header",
  component: Header
};

export function Default() {
  return <Header refinview="header" scroll={() => {}} headerTextHighlightRef={React.createRef()} />;
}
