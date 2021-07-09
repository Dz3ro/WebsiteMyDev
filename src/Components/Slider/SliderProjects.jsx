import React, { Component } from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { slider as sliderStyles } from "../../styles";
import { getProjects } from "../../ProjectsDatabase";
import SliderSlide from "./SliderSlide";
import SliderSlideButtons from "./SliderSlideButtons";
import SliderDesc from "./SliderDesc";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// state variables explanation
// #slideAnimStyle# is used to change the animations classes to either slide
// left or right depending on button pressed
// #readyToSlide# is used to disable slide buttons when slide animation is already happening
// #slideAnimTime# - this is used to set the animation time to 0 every time
// at start of page to avoid visual bug that ends when the animation does

class SliderProjects extends Component {
  slideSpeed = 1000;
  slideAuto = true;
  slideAutoCd = 10000;

  constructor(props) {
    super(props);
    this.state = {
      buttonLeftClass: "",
      buttonRightClass: "",
      buttonDescLeftClass: "",
      buttonDescRightClass: "",
      projects: [],
      projectDisplayed: {},
      slideAnimStyle: "",
      readyToSlide: false,
      slideAnimTime: 0,
      intervalId: 0,
    };
  }
  componentWillUnmount() {
    if (this.state.intervalId !== 0) {
      clearInterval(this.state.intervalId);
      this.setState({ slideAnimTime: 0, intervalId: 0 });
    } else this.setState({ slideAnimTime: 0 });
  }

  async componentDidMount() {
    const projects = await getProjects();

    this.setState({
      projects: projects,
      projectDisplayed: projects[0],
      buttonLeftClass: sliderStyles.buttonLeft.normal,
      buttonRightClass: sliderStyles.buttonRight.normal,
      buttonDescLeftClass: sliderStyles.buttonDescLeft.normal,
      buttonDescRightClass: sliderStyles.buttonDescRight.normal,
      slideAnimTime: this.slideSpeed,
    });
  }

  handleOnHover = () => {
    this.setState({
      buttonLeftClass: sliderStyles.buttonLeft.highlight,
      buttonRightClass: sliderStyles.buttonRight.highlight,
    });
  };
  handleOnUnhover = () => {
    this.setState({
      buttonLeftClass: sliderStyles.buttonLeft.normal,
      buttonRightClass: sliderStyles.buttonRight.normal,
    });
  };
  handleButtonDescLeftOnHover = () => {
    this.setState({
      buttonDescLeftClass: sliderStyles.buttonDescLeft.highlight,
    });
  };
  handleButtonDescLeftOnUnhover = () => {
    this.setState({
      buttonDescLeftClass: sliderStyles.buttonDescLeft.normal,
    });
  };
  handleButtonDescRightOnHover = () => {
    this.setState({
      buttonDescRightClass: sliderStyles.buttonDescRight.highlight,
    });
  };
  handleButtonDescRightOnUnhover = () => {
    this.setState({
      buttonDescRightClass: sliderStyles.buttonDescRight.normal,
    });
  };
  handleHoverLeft = () => {
    this.setState({
      slideAnimStyle: sliderStyles.slideAnimLeft,
    });
  };
  handleHoverRight = () => {
    this.setState({
      slideAnimStyle: sliderStyles.slideAnimRight,
    });
  };
  sliderLogic = (goLeft) => {
    if (!this.state.readyToSlide) return;
    this.setState({ readyToSlide: false });

    const project = this.state.projectDisplayed;
    const projects = this.state.projects;
    const index = projects.findIndex((x) => x._id === project._id);
    let newIndex = goLeft ? index - 1 : index + 1;

    if (newIndex < 0) newIndex = projects.length - 1;
    else if (newIndex > projects.length - 1) newIndex = 0;

    this.setState({ projectDisplayed: projects[newIndex] });
  };
  handleSlideLeft = () => {
    this.sliderLogic(true);
  };
  handleSlideRight = () => {
    this.sliderLogic(false);
  };

  handleRefreshSlideReadiness = () => {
    if (this.state.intervalId !== 0) clearInterval(this.state.intervalId);
    let intervalId;

    if (this.slideAuto)
      intervalId = setInterval(this.handleSlideLeft, this.slideAutoCd);

    if (!this.state.slideAnimStyle)
      this.setState({
        readyToSlide: true,
        slideAnimTime: this.slideSpeed,
        intervalId,
        slideAnimStyle: sliderStyles.slideAnimRight,
      });
    else
      this.setState({
        readyToSlide: true,
        slideAnimTime: this.slideSpeed,
        intervalId,
      });
  };

  render() {
    const project = this.state.projectDisplayed;

    const {
      buttonLeftClass,
      buttonRightClass,
      buttonDescLeftClass,
      buttonDescRightClass,
      slideAnimStyle,
    } = this.state;

    return (
      <div
        className="sliderProjectsContainer"
        onMouseEnter={() => this.handleOnHover()}
        onMouseLeave={() => this.handleOnUnhover()}
      >
        <SliderSlideButtons
          btnLeftClass={buttonLeftClass}
          btnRightClass={buttonRightClass}
          iconLeft={faAngleLeft}
          iconRight={faAngleRight}
          slideLeft={this.handleSlideLeft}
          slideRight={this.handleSlideRight}
          hoverLeft={this.handleHoverLeft}
          hoverRight={this.handleHoverRight}
        />

        <TransitionGroup>
          <CSSTransition
            onEntered={() => this.handleRefreshSlideReadiness()}
            classNames={slideAnimStyle}
            timeout={this.state.slideAnimTime}
            key={project._id}
          >
            <div className="slideContainer">
              <div className="slideContainerSmall">
                <SliderSlide
                  projectImg={project.urlImgMain}
                  altText={project.name}
                />
                <SliderDesc
                  buttonDescLeftOnHover={this.handleButtonDescLeftOnHover}
                  buttonDescLeftOnUnhover={this.handleButtonDescLeftOnUnhover}
                  buttonDescRightOnHover={this.handleButtonDescRightOnHover}
                  buttonDescRightOnUnhover={this.handleButtonDescRightOnUnhover}
                  buttonDescLeftClass={buttonDescLeftClass}
                  buttonDescRightClass={buttonDescRightClass}
                  projectName={project.name}
                  projectDesc={project.descriptionShort}
                />
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default SliderProjects;
