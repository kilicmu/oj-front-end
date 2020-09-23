const router = require("koa-router")();
const { problemInfo, answerScope } = require("../jsonData/answerJSON");
router.prefix("/api");

router.get("/getProblemInfo", async (ctx) => {
  const query = ctx.query;
  const id = query.pid;
  ctx.body = problemInfo[id - 1];
});

router.get("/getAnswerScope", async (ctx) => {
  ctx.body = answerScope;
});

module.exports = router;
