import { world } from 'mojang-minecraft';
import { http, HttpRequest, HttpRequestMethod } from 'mojang-net';
const 通讯端口 = 3000;
const host = 'http://localhost:'+通讯端口;

    
world.events.chat.subscribe(event => {
	// console.log("8888")
	const { message, sender } = event;
	const request = new HttpRequest(`${host}/${(sender.name.replaceAll(' ','_'))}/${(encodeURI(message.replaceAll('/','／')))}`)
		.setMethod(HttpRequestMethod.GET);
        // console.log(`${host}/${sender.name.replaceAll(' ','_').toString('base64') }/${message.toString('base64') }`)
	http.request(request).catch(err => console.warn(err));
});


world.events.tick.subscribe(evd => {
	if (evd.currentTick % 20 != 0) return;
	const request = new HttpRequest(`${host}`).setMethod(HttpRequestMethod.GET);

	http.request(request).then(res => {
		if (res.status == 400) return;
		const body = JSON.parse(res.body);
		body.r.forEach(element => {
			world.getDimension('overworld').runCommand(`tellraw @a { "rawtext": [{ "text": "<${element[0]}>${element[1]}" }]}`)
		});
		// body.forEach(message => world.getDimension('overworld').runCommand(`tellraw @a { "rawtext": [{ "text": "<${message.name}> (${message.user}) ${message.message}" }]}`));
 	});
});