const koa = require("koa")
const app = new koa();
const bodyParser = require('koa-bodyparser');
var router = require("./routes/router")
var cors = require('koa2-cors');

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