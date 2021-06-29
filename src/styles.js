const navbar = {
  navbar: "navbar",
  section: {
    normal: "section",
    highlight: "section sectionHighlight",
  },
  text: {
    normal: "sectionPart sectionText",
    highlight: "sectionPart sectionTextHighlight",
  },
  icon: {
    normal: "sectionPart sectionIcon",
    highlight: "sectionPart sectionIconHighlight",
  },
};

const slider = {
  buttonLeft: {
    normal: "sliderButton sliderButtonLeft sliderButtonLeftNormal",
    highlight: "sliderButton sliderButtonLeft sliderButtonLeftHighlight",
    disabled: "sliderButton sliderButtonLeft sliderButtonLeftNormal",
  },
  buttonRight: {
    normal: "sliderButton sliderButtonRight sliderButtonRightNormal",
    highlight: "sliderButton sliderButtonRight sliderButtonRightHighlight",
  },
  buttonDescLeft: {
    normal: "sliderDescButton sliderDescButtonLeft",
    highlight:
      "sliderDescButton sliderDescButtonHighlight sliderDescButtonLeft",
    disabled: "sliderDescButton sliderDescButtonDisabled sliderDescButtonLeft",
  },
  buttonDescRight: {
    normal: "sliderDescButton sliderDescButtonRight",
    highlight:
      "sliderDescButton sliderDescButtonHighlight sliderDescButtonRight",
    disabled: "sliderDescButton sliderDescButtonDisabled sliderDescButtonRight",
  },
  slideAnimLeft: "slideAnimLeft",
  slideAnimRight: "slideAnimRight",
};

export { navbar, slider };
