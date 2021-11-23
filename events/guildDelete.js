const axios = require('axios');
const { MessageEmbed } = require('discord.js');
//
module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
        try {
            axios({
              method: 'delete',
              url: 'http://95.156.227.203:5000/servers/sid/' + guild.id})
              console.log("Data deleted successfully !")
              } catch (err) {
          console.log(err)
            }
        
          let headersList6 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions6 = {
             url: "https://discord.com/api/users/" + guild.ownerID,
             method: "GET",
             headers: headersList6,
           }
           axios.request(reqOptions6).then(function (res) {
             console.log(res.data);
          //
          
          const bye_log_embed = new Discord.MessageEmbed()
          .setColor(`${red_color}`)
          .setDescription(`:no_entry:   Guild removed: **${guild.name}**  [` + '`' + `${res.data.id}` + '`' + ` / ` + '`' + `${res.data.username + '#' + res.data.discriminator}` + '`' + `] [${guild.memberCount}]`)
          .setFooter(`${bot_name}`, `${bot_logo}` )
          .setTimestamp()
          //
          client.channels.cache.get('870001541879316490').send(bye_log_embed)
           })
	},
};