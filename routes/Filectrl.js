var query = require("../lib/mysql")
var comm = require('../lib/multer')
var path = require("path");
var url = require("url")


class filectrl{
    //用户头像上传
    static async fileAvatarImg(ctx){
        var token = ctx.headers.authorization;
        var username = ctx.req.body.username;
        if(token==undefined){
            ctx.status=400;
        }else{
           ctx.status =200;
           var origin = "http://localhost:3000/uploads";
           var avatarpath = ctx.req.file.filename;
           var avatar = origin+"/"+avatarpath;
           ctx.body={
               avatar:avatar
           }
        }
    }
}

module.exports = filectrl;