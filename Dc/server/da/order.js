const mysql=require('./mysql')
const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const ERRORS = require('./constants').ERRORS
const debug=require('debug')('cbd')

function createOrder(userInfo,orderInit){
    /*
     `CompanyId` varchar(36) NOT NULL COMMENT '公司标识_部统一分配',
  `Address` int(6) NOT NULL COMMENT '发起地行政区划代码_见 GB/ T 2260',
  `OrderId` varchar(64) NOT NULL COMMENT '订单编号',
  `DepartTime` datetime NOT NULL COMMENT '预计用车时间_YYYYMMDDhhmmss',
  `OrderTime` datetime NOT NULL COMMENT '订单发起时间_YYYYMMDDhhmmss',
  `PassengerNote` varchar(128) DEFAULT NULL COMMENT '乘客备注',
  `Departure` varchar(128) NOT NULL COMMENT '预计出发地点详细地址',
  `DepLongitude` double(10,7) NOT NULL COMMENT '预计出发地点经度_单位：1* 10一6 度',
  `DepLatitude` double(10,7) NOT NULL COMMENT '预计出发地点纬度_单位：1* 10一6 度',
  `Destination` varchar(128) NOT NULL COMMENT '预计目的地',
  `DestLongitude` double(10,7) NOT NULL COMMENT '预计目的地经度_单位：巨10一6 度',
  `DestLatitude` double(10,7) NOT NULL COMMENT '预计目的地纬度_单位：巨10一6 度',
  `ENCRYPT` int(11) NOT NULL COMMENT '坐标加密标识_1 : GCJ—02 测绘局标准2 : WGS84 GPS 标准3: BD-  09 百度标准4: CGCS2000北斗标准0:其他',
  `FareType` varchar(16) NOT NULL COMMENT '运价类型编码',
    */
    var username=orderInit
    var id=userInfo
    
    console.log(userInfo)
    console.log(orderInit)
    var a = mysql('tuser').select('*').then(res => {
        console.log(res)

    })
    //  console.log(a)
    // 查重并决定是插入还是更新数据
    return mysql('tuser').count('id').where({
        id
    })
    .then(res => {
        
        // 如果存在用户则更新
        if (res[0].username) {
            return mysql('tuser').update({
                username
            }).where({
                id
            })
        } else {
            return mysql('tuser').insert({
                username
            })
        }
    })
    // .then(() => ({
    //     id: id,
    //     username: username
    // }))
    .catch(e => {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
    return "OKss"

}
function test(username){

}
module.exports={
    createOrder,
    test
}