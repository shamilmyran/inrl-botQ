const { inrl } = require('../lib/');
inrl(
	   {
		pattern: ['jid'],
		desc: 'To get jid off member',
                sucReact: "💯",
                category: ["system", "all"],
                type : "general"
	   },
	async (message, client) => {
if(message.quoted){
await client.sendMessage( message.from, { text: message.quoted.sender }, { quoted: message })
                } else {
await client.sendMessage( message.from, { text: message.from }, { quoted: message })
}});

inrl({
		pattern: ['block'],
		desc: 'To block a person',
                sucReact: "💯",
                category: ["system", "all"],
                type : "owner"
	   },
	async (message, client) => {
if(!message.client.isCreator) return message.send("only for owner!");
if(message.isGroup) { 
await client.updateBlockStatus(message.quoted.sender, "block") // Block user
}else{
await client.updateBlockStatus(message.from, "block")
    }
}); // Block user
inrl({
		pattern: ['unblock'],
		desc: 'To unblock a person',
                sucReact: "💯",
                category: ["system", "all"],
                type : "owner"
	   },
	async (message, client) => {
if(!message.client.isCreator) return message.send("only for owner!");
if(message.isGroup) { 
await client.updateBlockStatus(message.quoted.sender, "unblock") // Unblock user
}else{
await client.updateBlockStatus(message.from, "unblock") // Unblock user
    }
});
inrl({
	pattern: ['tagall'],
	desc: 'To tag all group member',
        sucReact: "😄",
        category: ["system", "all"],
        type : "owner"
	   }, async (message, client, match) => {
           if(!message.isGroup) return message.reply('this plugin only works in group!');
	   const groupMetadata = message.isGroup ? await client.groupMetadata(message.from).catch(e => {}) : ''
	   const participants = message.isGroup ? await groupMetadata.participants : ''
           let admins = message.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
           if(!message.client.isCreator) return message.reply('only for owner!');
		let msg = "╭─❮ ʜᴇy ᴀʟʟ 😛🪄 ❯ ─⊷❍\n", ext;
                let count =1;
                ext = `│${message.quoted?message.quoted.text||'hi all😚':match||'hi all🤎'}\n`
                msg += (typeof ext !== 'string'?'hy all😚':ext)
                for (let mem of participants) {
	             msg += `│${count++}  @${mem.id.split('@')[0]}\n`
                }
                msg += "╰───────────⊷❍";
		    return await client.sendMessage(message.key.remoteJid, {
			text: msg,mentions: participants.map(a => a.id) }, { quoted: message });
});
inrl({
	pattern: ['tagadmin'],
	desc: 'To tag all group member',
        sucReact: "😄",
        category: ["system", "all"],
        type : "owner"
	   }, async (message, client, match) => {
           if(!message.isGroup) return message.reply('this plugin only works in group!');
	   const groupMetadata = message.isGroup ? await client.groupMetadata(message.from).catch(e => {}) : ''
	   const participants = message.isGroup ? await groupMetadata.participants : ''
           let admins = message.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
           if(!message.client.isCreator) return message.reply('only for owner!');
	   let msg = "╭─❮ ʜᴇy ᴀᴅᴍɪɴꜱ🪄 ❯ ─⊷❍\n", ext;
           ext = `│${message.quoted?message.quoted.text||'hi all😚':match||'hi all🤎'}\n`
           msg += (typeof ext !== 'string'?'hy all😚':ext)
	   let count =1;
                for (let mem of admins) {
	            msg += `│${count++}  @${mem.split('@')[0]}\n`
                }
            msg += "╰───────────⊷❍";
		    return await client.sendMessage(message.key.remoteJid, {
			text: msg,mentions: participants.map(a => a.id) }, { quoted: message });
});
inrl({
		pattern: ['frd'],
		desc: 'for sending a message  by thir jid',
                sucReact: "😉",
                category: ["system", "all"],
                type : "utility"
	   },
	async (message, client, match) => {
if(!match) { return client.sendMessage(message.from, {text : "after the (cmd) enter the jid to share your data \n_example :- forward 910123456789@s.whatsapp.net_"}); }
let jid = match;
if(!message.quoted) return message.reply('need forwarding content! Image/video/audio/sticker/text');
if(message.quoted.imageMessage){
let msg = await message.quoted.download();
await client.sendMessage(jid, { image : msg });
}else if(message.quoted.stickerMessage){
let msg = await message.quoted.download();
await client.sendMessage(jid, { sticker : msg });
}else if(message.quoted.videoMessage){
let msg = await message.quoted.download();
await client.sendMessage(jid, { video : msg });
}else if(message.quoted.audioMessage){
let msg = await message.quoted.download();
await client.sendMessage(jid, { audio : msg });
}else { return await client.sendMessage(message.from, { text : "replay to a message with a jid"});}
});
inrl(
	   {
		pattern: ['whois'],
		desc: 'it send information of user',
                sucReact: "💯",
                category: ["system", "all"],
                type : "utility"
	   },
	async (message, client, match) => {
try{
let pp, from , cap;
if(!message.client.isCreator) return await client.sendMessage( message.from, { text: "sorry about thets this cmd only for owner"});
if(message.isGroup) {
if(!message.quoted) return;
from = message.quoted.sender;
try { pp = await client.profilePictureUrl(from, 'image') } 
catch { pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'}
//let { id, name } = message.conn.user;
let { status, setAt } = await client.fetchStatus(from)
let captiOn = "```"/*user : ${name}\nid : ${id}\n*/+`status :${status}\nstatus setAt : ${setAt}`+"```";
await client.sendMessage(message.from, { image : { url : pp }, caption : captiOn }, { quoted: message });
} else {
from = message.from;
try { pp = await client.profilePictureUrl(from, 'image') } 
catch { pp = 'https://i.ibb.co/gdp7HrS/8390ad4fefbd.jpg'}
//let { id, name } = message.conn.user;
let { status, setAt } = await client.fetchStatus(from)
let captiOn = "```"/*user : ${name}\nid : ${id}\n*/+`status :${status}\nstatus setAt : ${setAt}`+"```";
await client.sendMessage(message.from, { image : { url : pp }, caption : captiOn }, { quoted: message });
     }
} catch(e){
message.reply('error\n'+e)
   }
});
