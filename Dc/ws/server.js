const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({ 
            port: 8080 
            ,verifyClient:socketVerify    
        })

function socketVerify (info){
    Console.log(info)
    console.log(info.origin);  
    console.log(info.req.t);  
    console.log(info.secure);  
    // console.log(info.origin);  
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);  
    //if (origin.length >= 3 && origin[2] == "blog.luojia.me") {  
    //    return true; //如果是来自blog.luojia.me的连接，就接受  
    //}  
    // console.log("连接",origin[2]);  
    return true; //否则拒绝  
    //传入的info参数会包括这个连接的很多信息，你可以在此处使用console.log(info)来查看和选择如何验证连接 
}    

wss.on('connection', function (ws) {
    console.log('client connected')
    ws.on('message', function (message) {
        console.log(message)
    })
})
