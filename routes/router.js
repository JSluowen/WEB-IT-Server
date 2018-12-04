const Router = require("koa-router")
const multer = require("koa-multer");

const userctrl = require('./Userctrl')//管理员信息
const filectrl = require('./Filectrl')

var storage = require('../lib/multer')//multer配置文件

var router = new Router({
    prefix:'/api'
})

var upload = multer({storage:storage});

// 用户管理操作的api
router.post("/user/login",userctrl.login)//管理员登录接口
router.post('/user/userlogin',userctrl.userLogin)//用户登录接口
router.get('/user/userloading',userctrl.userLoading)
router.get('/user/userdelete',userctrl.userDelete)//删除用户信息
router.get('/user/userpass',userctrl.userPass)//用户审核通过
router.post('/user/register',userctrl.userRegister)//用户注册
router.post('/user/userinfo',userctrl.userInfo)//用户完善个人信息

// 文件管理操作api
router.post("/file/fileavatarimg",upload.single('file') ,filectrl.fileAvatarImg)//上传头像管理

module.exports = router;
