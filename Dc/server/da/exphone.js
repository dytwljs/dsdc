const mysql=require('./mysql')
const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const ERRORS = require('./constants').ERRORS
const debug=require('debug')('cbd')


function getByPhone(UserOpen_id){
    console.log(UserOpen_id);
    return mysql('tuser').select('*').then(res=>{
        // console.log(res[1])
        var aaaaa=JSON.stringify(res[1]);
        // console.log(aaaaa)
        return aaaaa
        // for(var i=0; i< res.length;i++){
        //     //  console.log(res[i]);
        //     return res[i]
        // }
    })

    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
}


module.exports={
    getByPhone
}