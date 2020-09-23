const Mock = require("mockjs");
const answerTemplate = {
  "problemInfo|1000": [
    {
      "id|+1": 1,
      title: "测试题@id",
      "difficuly|1-3": 1,
      "introduce|3": "题目介绍@id",
      "isPass|1": false,
      in: "输入测试",
      out: "输出测试",
      "demo|1-3": [{ "id|+1": 1, in: "测试输入@id", out: "测试输出@id" }],
      limitTime: "100ms",
      limitMemory: "10M",
      from: "root",
      information: "null"
    }
  ],

  answerScope: [
    { type: "C", code: "" },
    { type: "C++", code: "" },
    { type: "JAVA", code: "" }
  ]
};
const data = Mock.mock(answerTemplate);
module.exports = data;
