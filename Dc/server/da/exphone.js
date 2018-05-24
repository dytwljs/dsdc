const mysql=require('./mysql')
const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const ERRORS = require('./constants').ERRORS
const debug=require('debug')('cbd')


async function getByPhone(UserOpen_id){
    //console.log(UserOpen_id);
    var result=null
  await  mysql('tuser').select('*').then(res=>{
        // console.log(res[1])
        result=JSON.stringify(res[1]);
         console.log(result)
         return result
       
        // for(var i=0; i< res.length;i++){
        //     //  console.log(res[i]);
        //     return res[i]
        // }
    })
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
     console.log("result->"+result);

    return result
}


module.exports={
    getByPhone
}