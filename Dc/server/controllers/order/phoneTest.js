const configs = require('../../config')
const daOrder=require('../../da/exphone')

async function get(ctx ,next) {
// await next();   
    
    var id=ctx.query.ids
 //   console.log(id)
  
    var ax = daOrder.getByPhone(id,ctx)
    // console.log(".......")
    // console.log(a)
     ctx.body=ax;
 
}


module.exports= {
    get
    // post
}
