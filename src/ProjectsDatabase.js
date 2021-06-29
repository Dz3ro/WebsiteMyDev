const projects = [];

class Project {
  constructor(
    name,
    descriptionShort,
    descriptionLong,
    usedTools,
    codeUrl,
    liveUrl,
    screenshootUrl
  ) {
    this.id = projects.length;
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

export { getProjects };
