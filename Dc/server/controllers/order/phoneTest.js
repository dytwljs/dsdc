const configs = require('../../config')
const daOrder=require('../../da/exphone')

async function get(ctx,next) {
// await next();   
    
    var id=ctx.query.ids
 //   console.log(id)
  
    var a = daOrder.getByPhone(id)
    // console.log(".......")
    // console.log(a)
     ctx.body=a;
 
}


module.exports= {
    get
    // post
}
