import React from "react";
import SliderProjects from "../Slider/SliderProjects";
import ProjectCardsSection from "../ProjectsList/ProjectCardsSection";

function PageHome() {
  return (
    <div>
      <SliderProjects />
      <div className="separator"></div>
      <ProjectCardsSection />
    </div>
  );
}

export default PageHome;
