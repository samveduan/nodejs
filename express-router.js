/**
 * 功能演示：router功能
 */

/**
 * 一、express使用
 */

// 0. 安装
// 1. 引包
var express = require("express")
var router = require('./router')

// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express();

/**
  * 二、使用body-parser获取POST方式提交的数据
*/

// 二、使用body-parser获取POST方式提交的数据1：
var bodyParser = require("body-parser")

// 设置静态资源文件夹
// 只要这样做了，你就可以直接通过 /static/xx 的方式访问 public 目录中的所有资源了
app.use("/static/", express.static("./static/"));
app.use('/node_modules/', express.static('./node_modules/'));

/**
 * 三、art-template模板引擎：
 */

// 三、art-template模板引擎：设置模板文件类型
app.engine("html", require("express-art-template"))

// 二、使用body-parser获取POST方式提交的数据2：
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 四、把路由容器挂载到 app 服务中
app.use(router)

app.listen(5555, function () {
    console.log("服务启动成功......");
})