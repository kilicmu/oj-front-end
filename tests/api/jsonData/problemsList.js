const Mock = require("mockjs");
const problemsTemplate = {
  "content|1000": [
    {
      "id|+1": 1,
      title: "测试题@id",
      "acceptance|0.2": 0,
      "level|1-3": 1,
      "total|1-10": 1,
      "pass|1": false
    }
  ],
  currentPage: 1,
  onePageContent: 0,
  max: 1000
};

const data = Mock.mock(problemsTemplate);
module.exports = data;
