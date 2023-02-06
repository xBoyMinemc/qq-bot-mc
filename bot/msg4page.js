"use strict"
const { bot } = require("./index")

const 指定的群 = 768019903
const 通讯端口 = 3000


let messageBox = []//韭菜盒子

bot.on("message", function (msg) {
    
    if (msg.message[0].type !== 'text' || Number(msg.group_id) !== Number(指定的群)) return;

    if (messageBox.length > 9) messageBox.shift()
    messageBox.push([msg.sender.card + String(msg.sender.user_id).slice(-3), msg.message[0].text])
    //可以自行打表绑定id和qq号

})


// const bodyParser = require('body-parser')//沃克娶你奈奈得post body
const express = require("express");
const app = express()

app.get('*', function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain' })//重点在于bds的net模块只认这个不带UTF-8；的text/plain，所以重写了一次请求头
    // res.write('Hello World')
    if (req.params[0] === '/') {
        res.write(JSON.stringify({
            r: messageBox
        }))
        messageBox = []
    } else {
        console.log(req.params[0].split('/'))
        bot.pickGroup(指定的群).sendMsg("<" + req.params[0].split('/')[1] + ">" + req.params[0].split('/')[2])
    }

    res.end()
});

const server = app.listen(通讯端口, function () {

    const host = server.address().address
    const port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})  
