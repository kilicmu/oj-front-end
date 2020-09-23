const Mock = require("mockjs");
const Random = Mock.Random;

const headLinesTemplate = {
  "content|5": [
    {
      "id|+1": 1,
      title: "长头条测试试试试试试试@id",
      url: Random.url("http", "juejin.im")
    }
  ],
  status: "OK"
};

module.exports = Mock.mock(headLinesTemplate);
