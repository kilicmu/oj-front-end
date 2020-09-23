const Mock = require("mockjs");
const Random = Mock.Random;

const userData = {
  isLogin: true,
  name: "@cname",
  mail: "@email",
  "description|5": "这是一段用户描述测试 ",
  from: {
    province: {
      id: "",
      label: ""
    },
    city: {
      id: "",
      label: ""
    },
    county: {
      id: "",
      label: ""
    }
  },
  headPic: "@image",
  blogUrl: "@url",
  "tags|3": [{ "id|+1": 1, value: "标签@id", empty: false }]
};

module.exports = Mock.mock(userData);
