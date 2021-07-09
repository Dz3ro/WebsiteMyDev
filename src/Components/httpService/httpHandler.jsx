import axios from "axios";
import _ from "lodash";

const toolsUrl = "/tools";
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
  getTools: async function () {
    return await instance.get(toolsUrl);
  },
  login: async function (email, password, submitToCall) {
    return await instance.post(loginUrl, { email, password });
  },
  toolPost: async function (tool) {
    return await instance.post(toolsUrl, tool);
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
};

export default httpHandler;
