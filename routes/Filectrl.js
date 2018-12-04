var query = require("../lib/mysql");
var comm = require('../lib/comm');
var path = require("path");
var fs = require('fs');


class filectrl {
    //用户头像上传
    static async fileAvatarImg(ctx) {
        var token = ctx.headers.authorization;
        var username = ctx.req.body.username;
        if (token == undefined) {
            ctx.status = 400;
        } else {
            try {
                var sql = "select avatar from user_info where username=?";
                var data = await query(sql, [username]);
                if (data.length != 0) {
                    var avatarurl = data[0].avatar;
                    var avatarname = path.basename(avatarurl);
                    // var pathname = path.join(__dirname,avatarname);
                   
                    try {
                         // 删除用户之前的头像图片
                        await comm.delimg(avatarname);
                        var origin = "http://localhost:3000/uploads";
                        var avatarpath = ctx.req.file.filename;
                        var avatar = origin + "/" + avatarpath;
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            avatar: avatar
                        }
                    } catch(err){
                        //删除的文件不存在，也要将最新的文件名称发给前端。
                        var origin = "http://localhost:3000/uploads";
                        var avatarpath = ctx.req.file.filename;
                        var avatar = origin + "/" + avatarpath;
                        ctx.status = 200;
                        ctx.body = {
                            success: 1,
                            avatar: avatar
                        }
                    }
                } else {
                    console.log("我是测试文件")
                    var origin = "http://localhost:3000/uploads";
                    var avatarpath = ctx.req.file.filename;
                    var avatar = origin + "/" + avatarpath;
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        avatar: avatar
                    }
                }
            } catch (err) {
                ctx.status = 200
            }
        }
    }
}


module.exports = filectrl;