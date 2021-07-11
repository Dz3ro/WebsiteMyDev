import axios from "axios";
import _ from "lodash";

const toolsUrl = "/tools";
const projectsUrl = "/projects";
const mailUrl = "/mail";
const loginUrl = "/login";

const instance = axios.create({
  baseURL: "https://afternoon-beyond-63344.herokuapp.com/api",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
const token = localStorage.getItem("token");
instance.defaults.headers.common["x-auth-token"] = token;
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const httpHandler = {
  sendMsg: function (text, onSuccess, onFail) {
    instance
      .post(mailUrl, { text: text })
      .then(() => onSuccess())
      .catch(() => onFail());
  },

  login: async function (email, password, submitToCall) {
    return await instance.post(loginUrl, { email, password });
  },

  toolsGet: async function () {
    return await instance.get(toolsUrl);
  },
  toolPost: async function (tool) {
    const toSend = _.omit(tool, ["_id", "__v"]);
    return await instance.post(toolsUrl, toSend);
  },
  toolUpdate: async function (tool) {
    const toolId = tool._id;
    const toSend = _.omit(tool, ["_id", "__v"]);
    return await instance.put(`${toolsUrl}/${toolId}`, toSend);
  },
  toolDelete: async function (tool) {
    const toolId = tool._id;
    return await instance.delete(`${toolsUrl}/${toolId}`);
  },

  projectsGet: async function () {
    return await instance.get(projectsUrl);
  },

  projectPost: async function (project) {
    const toSend = _.omit(project, ["_id", "__v"]);
    const toolsArr = toSend.tools.toString().split(",");
    toSend.tools = toolsArr;
    const linksArr = toSend.urlImgAll.toString().split(",");
    toSend.urlImgAll = linksArr;

    for (const key in toSend) {
      const element = toSend[key];
      if (!element) delete toSend[key];
      else if (!element.toString().trim()) delete toSend[key];
    }

    return await instance.post(projectsUrl, toSend);
  },

  projectUpdate: async function (project) {
    const projectId = project._id;
    const toSend = _.omit(project, ["_id", "__v"]);
    const toolsArr = toSend.tools.toString().split(",");
    toSend.tools = toolsArr;
    const linksArr = toSend.urlImgAll.toString().split(",");
    toSend.urlImgAll = linksArr;

    for (const key in toSend) {
      const element = toSend[key];
      if (!element) delete toSend[key];
      else if (!element.toString().trim()) delete toSend[key];
    }
    return await instance.put(`${projectsUrl}/${projectId}`, toSend);
  },

  projectDelete: async function (project) {
    const projectId = project._id;
    return await instance.delete(`${projectsUrl}/${projectId}`);
  },
};

export default httpHandler;
