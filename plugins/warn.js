//created by @inrl

const {getVar} = require('../lib/database/variable');
const { inrl } = require('../lib')
const { setWarn, ResetWarn, ListWarn } = require('../lib/database/warndb')
inrl({
	pattern: ['warn'],
	desc: 'To warn a user in group',
        sucReact: "๐",
        category: ["system", "all"],
        type : "system"
	},async (message, client, match) => {
                let data = await getVar();
                let {WARNCOUND} = data.data[0];
        if(!message.client.isCreator) return message.reply('only for owner!')
        if(!message.isGroup) return message.reply('this plugin only work in grp')
    if(message.quoted){
    const u = message.quoted.sender;
    const g = message.from;
    const t = match || "warning";
    const d = await setWarn(u, g, t)
    let count = d.count, COUND = WARNCOUND;
    let remains = COUND - count;
    let warnmsg = `โโโโโโ[ แดกแดสษดษชษดษข ]โโโโโโ
โ Group:-${d.group}
โ User :-${d.user}
โโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโ INFO โโโโโโโโ
โ Reason :- ${d.reason}
โ Count :- ${d.count}
โ Remaining :- ${remains}
โโขโโโโโโโโโโโโโโโโโโโ`
  await message.reply(warnmsg)
  if(remains <= "0"){
    const u = message.quoted.sender;
    const g = message.from;
    const t = match || "reset";
    const d = await ResetWarn(u, g, t)
  await client.groupParticipantsUpdate( message.from, [message.quoted.sender], "remove" );
  return await message.reply("_user removes from the group due to warn limit existence_")
           };
     };
})
inrl({
	pattern: ['resetwarn'],
	desc: 'To remove warn count of a user',
        sucReact: "๐ฅ",
        category: ["system", "all"],
        type : "system"
	},async (message, client, match) => {
        if(!message.client.isCreator) return message.reply('only for owner!')
        if(!message.isGroup) return message.reply('this plugin only work in grp')
        if(message.quoted){
    const u = message.quoted.sender;
    const g = message.from;
    const t = match || "reset";
    const d = await ResetWarn(u, g, t)
    return await message.reply(`_reset ${u} your warn count in ${g}_`);
        }
});
