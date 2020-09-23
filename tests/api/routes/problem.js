/* eslint-disable @typescript-eslint/no-var-requires */
const router = require("koa-router")();
const Mock = require("mockjs");
const problemList = require("../jsonData/problemsList");
const headLines = require("../jsonData/headLines");
const contestList = require("../jsonData/contestJSON");
let userJSON = require("../jsonData/userJSON");

router.prefix("/api");

router.get("/", async (ctx) => {
  const { problemsTemplate } = require("../jsonData/problemsList");
  ctx.body = Mock.mock(problemsTemplate);
});

router.post("/login", (ctx) => {
  console.log(ctx.request);
});

router.get("/getProblemList", async (ctx) => {
  // ctx.query
  const data = problemList;
  const query = ctx.query;
  const searchVal = query.searchVal;
  let content = null;
  if (searchVal) {
    content = data.content.filter((val) => {
      console.log(val);
      return val.title.includes(searchVal);
    });
  } else {
    content = data.content;
  }
  const max = content.length;
  const currentPage = query.current;
  const onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/getProblemsProgress", async (ctx) => {
  let solved = 0;
  let attempted = 0;
  const all = problemList.max;
  for (const item of problemList.content) {
    if (item.pass) {
      ++solved;
    } else {
      ++attempted;
    }
  }
  ctx.body = { solved, attempted, all };
});

router.get("/getHeadLines", async (ctx) => {
  console.log(headLines);
  ctx.body = headLines;
});

router.get("/getContestList", async (ctx) => {
  // ctx.query
  const data = contestList;
  const query = ctx.query;
  const searchVal = query.searchVal;
  let content = null;
  if (searchVal) {
    content = data.content.filter((val) => {
      console.log(val);
      return val.contestName.includes(searchVal);
    });
  } else {
    content = data.content;
  }
  console.log(data);
  const max = content.length;
  const currentPage = query.current;
  const onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/getContestInfo", async (ctx) => {
  const query = ctx.query;
  if (!query.hasOwnProperty("cid")) {
    throw Error("Invalid request, you must give me cid");
  }
  const cid = query["cid"];
});

router.get("/getStatusList", async (ctx) => {
  // ctx.query
  const data = require("../jsonData/statusTest.json");
  const query = ctx.query;
  const searchVal = query.searchVal;
  let content = data.content;
  if (query.onlySelf === "true") {
    content = content.filter((val) => {
      //TODO token获取
      return val.anuther === "kilic3";
    });
  }
  if (searchVal) {
    content = content.filter((val) => {
      console.log(val.problem.title);
      console.log(searchVal);
      return val.problem.title.includes(searchVal);
    });
  }
  const max = content.length;
  const currentPage = query.current;
  const onePageContent = query.oneContent;
  if (query.current * query.oneContent > content.length) {
    content = content.slice((query.current - 1) * query.oneContent);
  } else {
    content = content.slice(
      (query.current - 1) * query.oneContent,
      query.current * query.oneContent
    );
  }
  ctx.body = {
    content,
    max,
    currentPage,
    onePageContent,
  };
});

router.get("/contestingState", async (ctx) => {
  ctx.body = {
    isContesting: true,
    contestingURL: "/contest/1",
  };
});

router.get("/contestAnnouncement", async (ctx) => {
  ctx.body = "<p>这是一段测试公告，支持富文本标签</p>";
});

router.get("/getRegionJson", async (ctx) => {
  const provinceJson = require("../public/json/province.json");
  const cityJson = require("../public/json/city.json");
  const countyJson = require("../public/json/county.json");
  ctx.body = {
    provinceJson,
    cityJson,
    countyJson,
  };
});

router.get("/getUserMsg", async (ctx) => {
  ctx.body = userJSON;
});

router.post("/postUserMsg", async (ctx) => {
  userJSON = JSON.parse(JSON.stringify(userJSON));
  ctx.body = userJSON;
});
router.post("/uploadHeadPic", async (ctx) => {
  console.log(ctx.uploadpath);
  ctx.body = ctx.uploadpath;
});

router.post("/checkContestCode", async (ctx) => {
  const body = ctx.request.body;
  const res = {};
  const checkCode = body.checkCode;
  console.log(checkCode);
  if (checkCode === "1111") {
    res.state = "OK";
    res.checkCode = checkCode;
  } else {
    res.state = "DONT_MATCH";
  }
  ctx.body = res;
});

router.post("/getContestingList", async (ctx) => {
  const body = ctx.request.body;
  console.log(body);
  ctx.body = {};
});

module.exports = router;
