const configs = require('../../config')
const daOrder = require('../../da/exphone')

async function get(ctx) {
    //  await next();   

    var id = ctx.query.ids
    //   console.log(id)
    
    await  daOrder.getByPhone(id,ctx)
    // console.log(".......")
    // console.log(a)
    // ctx.body=a;
}


module.exports = {
    get
// post
}
