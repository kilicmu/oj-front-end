/* eslint-disable @typescript-eslint/no-var-requires */
const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const path = require("path");
const {
  getStampDirName,
  checkDirExist,
  getFileExt,
  getFileName,
} = require("./utils/fileUtils");

const routers = require("./routes");

// error handler
onerror(app);

// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");

//   // 设置所允许的HTTP请求方法
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

//   // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
//   );

//   // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

//   // Content-Type表示具体请求中的媒体类型信息
//   ctx.set("Content-Type", "application/json;charset=utf-8");

//   // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
//   // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
//   ctx.set("Access-Control-Allow-Credentials", true);

//   // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
//   // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
//   // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
//   ctx.set("Access-Control-Max-Age", 300);

//   /*
//     CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
//         Cache-Control、
//         Content-Language、
//         Content-Type、
//         Expires、
//         Last-Modified、
//         Pragma。
//     */
//   // 需要获取其他字段时，使用Access-Control-Expose-Headers，
//   // getResponseHeader('myData')可以返回我们所需的值
//   //https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
//   ctx.set("Access-Control-Expose-Headers", "myData");
//   if (ctx.method == "OPTIONS") {
//     ctx.body = 200;
//   } else {
//     await next();
//   }
// });

// middlewares

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      uploadDir: path.resolve(__dirname, "/public/upload"),
      onFileBegin: (name, file) => {
        const ext = getFileExt(file.name);
        const dirName = getStampDirName();
        const dir = path.join(__dirname, `public/upload/${dirName}`);
        checkDirExist(dir);
        const fileName = `${getFileName(file.path)}.${ext}`;
        file.path = `${dir}/${fileName}`;
        app.context.uploadpath = app.context.uploadpath
          ? app.context.uploadpath
          : {};
        app.context.uploadpath[name] = `/upload/${dirName}/${fileName}`;
      },
      onError: (err) => {
        console.log(err);
      },
    },
  })
);
app.use(json());
app.use(logger());

app.use(require("koa-static")("./public"));
app.use(require("koa-static")("./upload"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
for (const route of Object.values(routers)) {
  app.use(route.routes(), route.allowedMethods());
}
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
