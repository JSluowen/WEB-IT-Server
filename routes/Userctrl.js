var query = require("../lib/mysql")
var comm = require('../lib/comm')

class Userctrl {
    // 用户登录
    static async login(ctx) {
        var values = ctx.request.body
        var username = values.username
        var password = values.password
        var sql = "SELECT *FROM USER WHERE username = ?"
        try {
            var userInfo = await query(sql, [username]);
            // 判断用户是否存在
            console.log(userInfo)
            if (userInfo[0].length === 0) {
                ctx.status = 200
                ctx.body = {
                    have: 0,
                    active: 0,
                    pas: 0
                };
            } else {
                // 判断是管理员还是普通用户
                if (!userInfo[0].identity) {
                    ctx.status = 200
                    ctx.body = {
                        have: 1,
                        identity: 0,
                        active: 0
                    }
                } else {
                    // 密码加密
                    password = comm.md5(password)
                    //判断用户密码是否正确
                    if (password == userInfo[0].password) {
                        ctx.status = 200
                        var token = comm.token(username)
                        ctx.body = {
                            token: token,
                            have: 1,
                            active: userInfo[0].is_active,
                            pas: 1,
                            identity: userInfo[0].identity
                        }
                    } else {
                        ctx.status = 200
                        ctx.body = {
                            have: 1,
                            pas: 0,
                            active: 1,
                            identity: 1
                        }
                    }
                }

            }

        } catch (error) {
            ctx.status = 200
        }
    }

    // 后台用户数据查询加载
    static async userLoading(ctx){
        var token = ctx.request.header.authorization
        if(token==undefined){
          ctx.status=400;
        }else{
          ctx.status=200;
          var sql = 'SELECT *FROM USER'
          var data = await query(sql)
          ctx.body={
              data:data
          }
        }
    }
}
module.exports = Userctrl