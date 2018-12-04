var fs =require("fs");

function fun(){
    return  new Promise((resolve,reject)=>{
        fs.unlink('./static/uploads/1543324342072.jpg',(err)=>{
            if(err){
                reject(err)
                
            }
            resolve("删除成功");          
        })
    })
}
fun().then(()=>{
    console.log("删除成功")
}).catch((err)=>{
    console.log("删除失败"+err);
})