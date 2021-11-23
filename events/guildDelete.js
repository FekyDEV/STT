const axios = require('axios');
const { MessageEmbed } = require('discord.js');
//
const bot_color = '0x370595';
//
module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
        //
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
            "Authorization": "Bot OTA0MDk0ODQzNTAzMDEzOTQ4.YX2h7w.neJLknzp0IdkqF6YodVca5OvbL8" 
           }
           let reqOptions6 = {
             url: "https://discord.com/api/v9/users/" + guild.ownerId,
             method: "GET",
             headers: headersList6,
           }
           axios.request(reqOptions6).then(function (res) {
             console.log(res.data);
          //
          
          const bye_log_embed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`:no_entry:   Guild removed: **${guild.name}**  [` + '`' + `${res.data.id}` + '`' + ` / ` + '`' + `${res.data.username + '#' + res.data.discriminator}` + '`' + `] [${guild.memberCount}]`)
          .setFooter(client.user.tag, client.user.displayAvatarURL( { dynamic: true } ))
          .setTimestamp()
          //
         axios.post('https://canary.discord.com/api/webhooks/912699228810272788/_oe9p6G6KxI64vN00gG6_t5AbENpTQ_5kU9KY2MKrCIYIDC9Ua91tZuJBaujXQwae6o0', {
            username: "STT | LOG",
            avatar_url: client.user.displayAvatarURL( { dynamic: true}),
	        embeds: [ bye_log_embed ],
        })
           })
	},
};