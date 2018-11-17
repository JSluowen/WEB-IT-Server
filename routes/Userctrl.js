var query = require("../lib/mysql")
var comm = require('../lib/comm')

class Userctrl {
    // 管理员登录
    static async login(ctx) {
        var values = ctx.request.body
        var username = values.username
        var password = values.password
        var sql = "SELECT *FROM USER WHERE username = ?"
        try {
            var userInfo = await query(sql, [username]);
            console.log(userInfo)
            // 判断用户是否存在
            if (userInfo[0].length === 0) {
                ctx.status = 200
                ctx.body = {
                    have: 0,
                    status: 0,
                    pas: 0
                };
            } else {
                // 判断是管理员还是普通用户
                if (!userInfo[0].identity) {
                    ctx.status = 200
                    ctx.body = {
                        have: 1,
                        identity: 0,
                        status: 0,
                        pas: 0
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
                            status: userInfo[0].status,
                            pas: 1,
                            identity: userInfo[0].identity
                        }
                    } else {
                        ctx.status = 200
                        ctx.body = {
                            have: 1,
                            pas: 0,
                            status: 1,
                            identity: 1
                        }
                    }
                }

            }

        } catch (error) {
            ctx.status = 200
        }
    }
    //用户登录
    static async userLogin(ctx) {
        var values = ctx.request.body
        var username = values.username
        var password = values.password
        var sql = "SELECT *FROM USER WHERE username = ?"
        try {
            var userInfo = await query(sql, [username]);
            console.log(userInfo)
            // 判断用户是否存在
            if (userInfo[0].length === 0) {
                ctx.status = 200
                ctx.body = {
                    have: 0,
                    status: 0,
                    pas: 0
                };
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
                        status: userInfo[0].status,
                        pas: 1,
                        identity: userInfo[0].identity
                    }
                } else {
                    ctx.status = 200
                    ctx.body = {
                        have: 1,
                        pas: 0,
                        status: 1,
                        identity: 1
                    }
                }
            }
        } catch (error) {
            ctx.status = 400
        }
    }
    // 后台用户数据查询加载
    static async userLoading(ctx) {
        var token = ctx.request.header.authorization
        if (token == undefined) {
            ctx.status = 400;
        } else {
            try {
                ctx.status = 200;
                var sql = 'SELECT *FROM USER'
                var data = await query(sql)
                ctx.body = {
                    data: data
                }
            } catch (error) {
                ctx.status=400;
            }
        }
    }
    //删除用户数据
    static async userDelete(ctx) {
        var token = ctx.request.header.authorization
        var values = ctx.request.query;
        if (token == undefined) {
            ctx.status = 400;
        } else {
            ctx.status = 200;
            try {
                var sql = 'DELETE FROM USER WHERE username= ?'
                var data = await query(sql, [values.username])
                if (data.affectedRows) {
                    ctx.body = {
                        message: "删除成功"
                    }
                } else {
                    ctx.body = {
                        message: "删除失败"
                    }
                }

            } catch (error) {
                ctx.status = 400
            }


            // var sql = 'delete from user where username= ?'
            // var data = await query(sql,)
        }
    }
    //用户审核通过
    static async userPass(ctx) {
        var token = ctx.request.header.authorization
        var values = ctx.request.query;
        if (token == undefined) {
            ctx.status = 400
        } else {
            ctx.status = 200
            try {
                var sql = "update user set status = 1 where username=?"
                var data = await query(sql, [values.username])
                if (data.affectedRows) {
                    ctx.body = {
                        message: "审核通过"
                    }
                } else {
                    ctx.body = {
                        message: "审核未通过"
                    }
                }
            } catch (error) {
                ctx.status = 400
                ctx.boy = {
                    message: "审核出错"
                }
            }

        }
    }
    //用户注册
    static async userRegister(ctx) {
        var values = ctx.request.body;
        try {
            ctx.status = 200;
            var sql1 = "SELECT *FROM USER WHERE username= ?"
            var checkdata = await query(sql1, [values.username])
            if (checkdata.length > 0) {
                ctx.body = {
                    message: "用户已存在,请重新选择用户名",
                    have: 1
                }
            } else {
                try {
                    var sql2 = "INSERT INTO USER (username,PASSWORD,email ) VALUES(?,?,?)"
                    var pass = comm.md5(values.password)
                    await query(sql2, [values.username, pass, values.email])
                    ctx.body = {
                        message: "注册成功,请联系管理员审核通过！",
                        have: 0
                    }
                } catch (error) {
                    ctx.status = 400
                    ctx.body = {
                        message: '注册失败'
                    }
                }
            }
        } catch (error) {
            ctx.status = 400
            ctx.body = {
                message: '注册失败'
            }
        }
    }
}
module.exports = Userctrl