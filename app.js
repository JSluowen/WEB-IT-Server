const koa = require("koa")
const app = new koa();
const bodyParser = require('koa-bodyparser');
const router = require("./routes/router")
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require("path"); 

app.use(static(
    path.join( __dirname,  'static')
)) 

app.use(bodyParser());
app.use(cors())

app.use(router.routes())

app.use(router.allowedMethods())
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("running、、、3000")
})