const axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed, } = require('discord.js');
//
const ip = '5.249.164.143'
//
const bot_color = '0x370595';
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
//
module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember) {
/////////////////////////////
let headersList544 = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
   }
   let reqOptions544 = {
     url: "https://discord.com/api/users/" + guildMember.user.id,
     method: "GET",
     headers: headersList544,
   }
   axios.request(reqOptions544).then(function (res2) {
  //
  let headersList5884 = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
   }
   let reqOptions5884 = {
     url: `http://${ip}:5000/servers/sid/` + guildMember.guild.id,
     method: "GET",
     headers: headersList5884,
   }
   axios.request(reqOptions5884).then(function (res3) {
  //
  let headersList45 = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
   }
//
   let reqOptions45 = {
     url: `http://${ip}:4000/reports/id/` + guildMember.user.id,
     method: "GET",
     headers: headersList45,
   }
   axios.request(reqOptions45).then(function (res) {
    if(!res.data[0]) return;

     //
     const welcome_blacklisted_new = new MessageEmbed()
     .setColor("RED")
     .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
     .setTitle('NEW USER IS')
     .setDescription("**╚ Blacklisted !**")
     .addField(`User Tag`, res2.data.username + `#${res2.data.discriminator}`, false)
     .addField(`User ID`, res2.data.id, false)
     .setImage('https://i.imgur.com/TlNvTNW.png')
     .setFooter(`${bot_name}`, `${bot_logo}` )
     .setTimestamp()
     //
    //
    if(res3.data[0].autoban == true) {
        guildMember.ban({ reason: 'ST BOT: User is Blacklisted in Stop The Trollers !' })
        welcome_blacklisted_new.addField("Auto Ban", "> User was banned !")
    }
    //
    if(res3.data[0].autorole == true) {
        const autorolerole = res3.data[0].autorole_role
        if(!guildMember.manageable || !autorolerole.editable) {
            welcome_blacklisted_new.addField("Auto Role", "Nope, cannot add role to that member! (Try move my role higher)")
        } else {
        guildMember.roles.add(res3.data[0].autorole_role);
        welcome_blacklisted_new.addField("Auto Role", "> Role was added !")
        }
    }
    //
    if(!res3.data[0].log_channel == "none") {
        console.log("NO LOG :(");
     } else {
    if(res.data[0].status === "accepted") { 
        guildMember.guild.channels.cache.get(res3.data[0].log_channel).send({ embeds: [welcome_blacklisted_new]})
     }
    }
    //
    }) // RES (1)
   }) // RES3
  }) // RES2
/////////////////////////////
	} // EXECUTE
}; // EXPORT