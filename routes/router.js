const Router = require("koa-router")
const userctrl = require('./Userctrl')//管理员信息


var router = new Router({
    prefix:'/api'
})

router.post("/user/login",userctrl.login)
router.get('/user/userloading',userctrl.userLoading)


module.exports = router;