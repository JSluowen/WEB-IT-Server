const Router = require("koa-router")
const userctrl = require('./Userctrl')//管理员信息


var router = new Router({
    prefix:'/api'
})

// 用户管理操作的api
router.post("/user/login",userctrl.login)
router.get('/user/userloading',userctrl.userLoading)
router.get('/user/userdelete',userctrl.userDelete)
router.get('/user/userpass',userctrl.userPass)
router.post('/user/register',userctrl.userRegister)

module.exports = router;