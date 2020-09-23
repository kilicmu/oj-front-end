// import axios, { AxiosRequestConfig } from "axios";
import { Store } from "@/store/store";
import { isEmail } from "@/utils/isEmail.ts";
import { URIS } from "@/api/URIS";
import { axios } from "./configedAxios";

type HttpMethods = "GET" | "POST";
interface RequestParams {
  method?: HttpMethods;
  data?: object;
  query?: object;
}

/**
 * 发送基础的GET与POST的异步请求，
 * 使用柯里化分离数据和请求地址，
 * 根据query与data自动确认请求方法，query是get请求，data是post请求
 * @param {string} url 请求url
 * @return {Promise} 请求的Promise
 */
function asyncRequest(url: string) {
  url = url && url.length !== 0 ? url : "/";
  return (params: RequestParams) => {
    const method = params.data ? "POST" : "GET";
    let query = null;
    let data = null;
    switch (method) {
      case "GET":
        query = method === "GET" ? (params.query ? params.query : {}) : null;
        break;
      case "POST":
        data = method === "POST" ? (params.data ? params.data : {}) : null;
        break;
    }
    const config = {};
    config["url"] = url;
    config["method"] = method;
    data ? (config["data"] = data) : null;
    query ? (config["params"] = query) : null;
    return new Promise((resolve, reject) => {
      axios(config)
        .then((res: any) => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
}

interface LoginForm {
  username: string;
  password: string;
}

async function login(loginForm: LoginForm) {
  const url = URIS.login;
  return asyncRequest(url)({ data: loginForm });
}

type ListType = "ProblemList" | "ContestList" | "StatusList";
/**
 * 获取ListType所列举种类的列表，请求接口约束：‘get'+list:ListType
 * @param {string} listType 需求列表类型
 * @param {number} oneContent 每页内容
 * @param {number} current 当前页码
 * @param {string} searchVal 查询字符串
 * @param {boolean} onlySelf 是否仅仅显示个人信息（适用于statusList）
 */
async function asyncRequireList(
  listType: ListType,
  oneContent: number,
  current = 1,
  searchVal = "",
  onlySelf = false
) {
  const url = "get" + listType;
  const query = {
    current,
    oneContent,
    onlySelf,
  };
  searchVal !== "" ? (query["searchVal"] = searchVal) : null;
  return await asyncRequest(url)({ query });
}

/**
 *
 * @param username 用户名或已经注册的用户名邮箱
 */
async function sendEmail(username: string) {
  const query = {};
  /**判断是否是mail,做不同的封装 */
  if (isEmail(username)) {
    query["Email"] = username;
  } else {
    query["username"] = username;
  }
  //TODO 做sendEmail接口
  return asyncRequest(URIS.sendEmail)({ query });
}

/**
 * 获取指定Problems页面目标页码数据
 * @param step 请求页数步长（缓存）
 * @param current 当前页面码
 * @param oneContent 一页数据条数
 */
async function getProblems(searchVal = "", current = 1, oneContent = 15) {
  const query = {
    current,
    oneContent,
  };
  searchVal !== "" ? (query["searchVal"] = searchVal) : null;
  return await asyncRequest(URIS.getProblems)({ query });
}

/**
 * 根据用户名获取用户的进度情况
 * @param {string} username 用户名
 * @return {Object} 返回完成的数量和未完成的数量
 */
async function getProblemsProgress() {
  return await asyncRequest(URIS.getProblemsProgress)({});
}

async function getProblemInfo(pid: number) {
  const url = URIS.getProblemInfo;
  return await asyncRequest(url)({ query: { pid } });
}

async function getHeadLines() {
  return await asyncRequest(URIS.getHeadLines)({});
}

async function getAnswerScope(id: string) {
  return await asyncRequest(URIS.getAnswerScope)({ query: { id } });
}

async function submitProblem(data: { type: string; code: string }) {
  const url = URIS.submitProblemCode;
  return await asyncRequest(url)({ data });
}

async function getContestList(current = 1, oneContent = 10) {
  const url = URIS.contestList;
  return await asyncRequest(url)({ query: { current, oneContent } });
}

async function getContestingState() {
  const url = URIS.contestingState;
  return await asyncRequest(url)({});
}

async function getContestAnnouncement() {
  const url = URIS.contestAnnouncement;
  return await asyncRequest(url)({});
}

async function getRegionJson() {
  const url = URIS.getRegionJson;
  return await asyncRequest(url)({});
}

async function getUserMsg(username: string) {
  const url = URIS.getUserMsg;
  return await asyncRequest(url)({ query: { username } });
}

/**
 * 提交修改数据，更新后返回相同格式JSON数据
 * @param data 提交的数据
 */
async function postUserMsg(data: Store.PostUserMsg) {
  const url = URIS.postUserMsg;
  return await asyncRequest(url)({ data });
}

/**
 * 上传头像图片
 * @param file 上传的文件
 */
async function uploadHeadPic(file: any) {
  const url = URIS.uploadHeadPic;
  const data = {
    file,
  };
  return await asyncRequest(url)({ data });
}

/**
 * 对contest进行校验
 * @param {string} clid 校验contest的id
 * @param {string} checkCode 校验码
 * @return {} {statu: "OK"|"REFUSE"|"DONT_MATCH"}
 */
async function checkContestCode(clid: string, checkCode: string) {
  const url = URIS.checkContestCode;
  return await asyncRequest(url)({
    data: { clid: clid, checkCode: checkCode },
  });
}

/**
 * 根据clid获取contest的信息
 * @param {string} clid 参与的contest的id
 * @param {string} checkCode 校验码
 */
async function getContestingList(clid: string, checkCode: string) {
  const url = URIS.getContestingList;
  const res: any = await checkContestCode(clid, checkCode);
  if (res.state === "OK") {
    return await asyncRequest(url)({
      data: { clid: clid, checkCode: checkCode },
    });
  } else {
    return res;
  }
}

const api = {
  login,
  getProblems,
  getProblemsProgress,
  getHeadLines,
  asyncRequireList,
  getProblemInfo,
  submitProblem,
  getContestList,
  getContestingState,
  getContestAnnouncement,
  getRegionJson,
  postUserMsg,
  uploadHeadPic,
  checkContestCode,
  getContestingList,
  getUserMsg,
  sendEmail,
  getAnswerScope,
};

export { checkContestCode };

export default {
  install(vue: any) {
    vue.prototype.$api = api;
  },
};
