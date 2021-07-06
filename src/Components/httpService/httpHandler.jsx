import axios from "axios";

const tools = "/tools";
const mailUrl = "/mail";

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

const httpHandler = {
  sendMsg: function (text, onSuccess, onFail) {
    instance
      .post(mailUrl, { text: text })
      .then(() => onSuccess())
      .catch(() => onFail());
  },
  getTools: function () {
    instance
      .get(tools)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  },
};

export default httpHandler;
