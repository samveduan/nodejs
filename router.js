/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var express = require("express")
var fs = require("fs")

// 1. 创建一个路由容器
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
router.get("/", function (req, res) {
    //res.send("get请求根目录");
    res.render("index.html");
})

// 查询所有数据
router.get("/list", function (req, res) {
    var dataObj = { ret: false, total: 0, rows: [], msg: "" };

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var dataArr = JSON.parse(data);
            dataObj.total = dataArr.length;
            dataObj.ret = true;
            dataObj.rows = dataArr;
        } else {
            dataObj.msg = "读取文件失败！";
        }

        res.json(dataObj);
    })
})

router.get("/test", function (req, res) {
    // 在 Express 中可以直接 req.query 来获取查询字符串参数
    // 获取geg请求参数
    res.send(req.query);
})

// 添加
router.get("/add", function (req, res) {
    // 在 Express 中使用模板引擎有更好的方式：res.render('文件名， {模板对象})
    // art-template 官方文档：如何让 art-template 结合 Express 来使用
    res.render("add.html", { "title": 'art-template' });
})

// 添加
router.post("/add", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    var userObj = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city
    }

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var dataArr = JSON.parse(data);
            userObj.id = dataArr.length;
            dataArr.push(userObj);

            fs.writeFile("./file/obj.txt", JSON.stringify(dataArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "添加用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.ret = false;
                    dataObj.msg = "添加用户失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.ret = false;
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

// 删除
router.delete("/delete", function (req, res) {
    var dataObj = { ret: false, msg: "" };

    var idArr = JSON.parse(req.body.userIdArr);

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var userArr = JSON.parse(data);

            for (var i = 0; i < userArr.length; i++) {
                for (var n = 0; n < idArr.length; n++) {
                    if (userArr[i].id === idArr[n]) {
                        userArr.splice(i, 1);
                    }
                }
            }

            fs.writeFile("./file/obj.txt", JSON.stringify(userArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "删除用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.msg = "写入文件失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

// 编辑
router.post("/edit", function (req, res) {
    let dataObj = { ret: false, msg: '' };

    let userObj = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city
    }

    fs.readFile("./file/obj.txt", function (error, data) {
        if (!error) {
            var userArr = JSON.parse(data);

            for (var i = 0; i < userArr.length; i++) {
                if (userArr[i].id == userObj.id) {
                    userArr[i] = userObj;
                }
            }

            fs.writeFile("./file/obj.txt", JSON.stringify(userArr), function (error, data) {
                if (!error) {
                    dataObj.ret = true;
                    dataObj.msg = "编辑用户成功！";
                    res.json(dataObj);
                } else {
                    dataObj.msg = "写入文件失败！";
                    res.json(dataObj);
                }
            })
        } else {
            dataObj.msg = "读取文件失败！";
            res.json(dataObj);
        }
    })
})

router.get("/404", function (req, res) {
    res.render("404.html");
})

module.exports = router;