"use strict"
const { createClient } = require("oicq")

const account = 123456789

const bot = createClient(account)

bot
.on("system.login.qrcode", function (e) {
	this.logger.mark("扫码后按Enter完成登录")
	process.stdin.once("data", () => {
		this.login()
	})
})
.login()

exports.bot = bot

require("./msg4page.js")

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
