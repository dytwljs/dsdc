const configs = require('../../config')
const daOrder=require('../../da/order')
async function get (ctx, next) {

    daOrder.createOrder(null,null)
    ctx.body = 'success'
}
async function post (ctx, next) {

    daOrder.createOrder(null,null)
    ctx.body = 'success'
}
module.exports= {
    get,
    post
}
