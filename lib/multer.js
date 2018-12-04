const multer = require("koa-multer");
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'static/uploads/')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        cb(null,Date.now() + "." + 'jpg');
    }
}) 

module.exports =storage;
