var crypto = require('crypto');
var path = require('path');
var jwt = require('jsonwebtoken')

module.exports={
    //md5加密
    md5:function(str){
        var  hash = crypto.createHash('md5')
        hash.update(str)
        return hash.digest('hex')
    },
    //跨域请求认证设置token
    token:function(data){
        return jwt.sign({
            data:data
        },"web",{
            expiresIn: '24h'
        })
    }
}