const configs = require('../../config')
const daOrder=require('../../da/order')

async function get (ctx, next) {
    //获取请求参数
    var sets=ctx.query.id;
    console.log(sets)
    var names=ctx.query.username;
    console.log(names)
    
  var a=  daOrder.createOrder(sets,names)
    ctx.body = a
}
async function post (ctx, next) {
    ctx.body = 'success'
}
module.exports= {
    get,
    post
}
