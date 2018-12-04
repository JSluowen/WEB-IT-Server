var crypto = require('crypto');
var jwt = require('jsonwebtoken')
var fs = require("fs")

module.exports = {
    //md5加密
    md5: function (str) {
        var hash = crypto.createHash('md5')
        hash.update(str)
        return hash.digest('hex')
    },
    //跨域请求认证设置token
    token: function (data) {
        return jwt.sign({
            data
        }, "web", {
            expiresIn: '24h'
        })
    },
    //删除图片
    delimg: function (avatarname) {
        return new Promise((resolve, rejecet) =>{
            fs.unlink(`./static/uploads/${avatarname}`, (err) => {
                if (err) {
                    rejecet(err)
                }
                resolve("删除成功")
            })
        })
    }
}