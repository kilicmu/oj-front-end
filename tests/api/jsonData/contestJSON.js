const Mock = require("mockjs");

const contestList = {
  "content|100": [
    {
      "id|+1": 1,
      contestName: "比赛姓名@id",
      contestInfo: "比赛简介@id",
      contestURL: "/contest/@id",
      "contestDate|1591697067479-1599697067479": 1591697067479,
      contestDataEnd: "@contestDate",
      'contestState|["on","off","wait"]': "",
      'type|["io"]': "",
    },
  ],
  currentPage: 1,
  onePageContent: 10,
  max: 100,
  searchVal: "",
};

const data = Mock.mock(contestList);
module.exports = data;
