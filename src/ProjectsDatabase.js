const projects = [];

class Project {
  constructor(
    _id,
    name,
    descriptionShort,
    descriptionLong,
    usedTools,
    codeUrl,
    liveUrl,
    screenshootUrl
  ) {
    this._id = _id;
    this.name = name;
    this.descriptionShort = descriptionShort;
    this.descriptionLong = descriptionLong;
    this.usedTools = usedTools;
    this.codeUrl = codeUrl;
    this.liveUrl = liveUrl;
    this.screenshootUrl = screenshootUrl;
  }
}

const project1 = new Project(
  1,
  "palm1",
  "description short pal sadxx cvxcv xcvcxv",
  "description long YYY YYYYYYYYYY YYYYYYYYYY YYYYYYYYYYYYYY",
  "Unity MongoDB",
  "https://github.com/Dz3ro/Dz3ro",
  `/project/1`,
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
);

projects.push(project1);

const project2 = new Project(
  2,
  "palm2",
  "description short palm 2sadasd asdasdasd asdasda sdsad",
  "description long YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "Unity MongoDB",
  "https://github.com/Dz3ro/Dz3ro",
  `/project/2`,
  "https://media.istockphoto.com/photos/summer-background-low-angle-view-of-tropical-palm-trees-over-clear-picture-id1225394367?s=612x612"
);

projects.push(project2);

const project3 = new Project(
  3,
  "warcraft",
  "description short xxxxx xxxxxx xxxx xxxx",
  "description long YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
  "Unity MongoDB",
  "https://github.com/Dz3ro/Dz3ro",
  `/project/3`,
  "https://i.ytimg.com/vi/g1n_1thVbfg/maxresdefault.jpg"
);

projects.push(project3);

function getProjects() {
  return projects;
}

const items = [
  "Node",
  "React",
  "Entity Framework",
  "p5",
  "Unity",
  "MongoDB",
  "SQLite",
  "MySQL",
  "Xamarin",
  "Redux",
  "Typescript",
];

function getProjectTags() {
  return items;
}

const project10 = new Project(
  10,
  "warcraft",
  "description short xxxxx xxxxxx xxxx xxxx",
  "description long YYYYYY YYYYYY YYYYYYY YYYYYYYY YYYYYYYY YYYYYYY YYYYYY YYYYYY",
  ["Typescript", "Xamarin"],
  "https://github.com/Dz3ro/Dz3ro",
  `/project/3`,
  "https://i.ytimg.com/vi/g1n_1thVbfg/maxresdefault.jpg"
);

const project11 = { ...project10 };
project11._id = 11;
project11.name = "League of Legends";
project11.usedTools = ["p5", "Xamarin"];

const project12 = { ...project10 };
project12._id = 12;
project12.name = "Falling Letters";
project12.usedTools = ["p5", "Xamarin"];

const project13 = { ...project10 };
project13._id = 13;
project13.name = "Tringo";
project13.usedTools = ["MongoDB", "Node"];

const project14 = { ...project10 };
project14._id = 14;
project14.name = "Starcraft";
project14.usedTools = ["React", "Redux"];

const project15 = { ...project10 };
project15._id = 15;
project15.name = "Bob";
project15.usedTools = ["Entity Framework", "MySQL"];

const project16 = { ...project10 };
project16._id = 16;
project16.name = "Battlefield";
project16.usedTools = ["Unity"];

const project17 = { ...project10 };
project17._id = 17;
project17.name = "Saper";
project17.usedTools = ["Node"];

const project18 = { ...project10 };
project18._id = 18;
project18.name = "Rogue";
project18.usedTools = ["Unity"];

const project19 = { ...project10 };
project19._id = 19;
project19.name = "Paladin";
project19.usedTools = ["Typescript", "React"];

const project20 = { ...project10 };
project20._id = 20;
project20.name = "Druid";
project20.usedTools = ["Typescript", "Redux"];

const projectsAll = [];

projectsAll.push(project10);
projectsAll.push(project11);
projectsAll.push(project12);
projectsAll.push(project13);
projectsAll.push(project14);
projectsAll.push(project15);
projectsAll.push(project16);
projectsAll.push(project17);
projectsAll.push(project18);
projectsAll.push(project19);
projectsAll.push(project20);

function getProjectsAll() {
  return projectsAll;
}

export { getProjects, getProjectTags, getProjectsAll };
