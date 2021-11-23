const axios = require('axios');
const { MessageEmbed, Client } = require('discord.js');
//
const bot_color = '0x370595';
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
//
module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
        //
        let headersList5 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Authorization": "Bot OTA0MDk0ODQzNTAzMDEzOTQ4.YX2h7w.neJLknzp0IdkqF6YodVca5OvbL8" 
           }
           let reqOptions5 = {
             url: "https://discord.com/api/v9/users/" + guild.ownerId,
             method: "GET",
             headers: headersList5,
           }
           axios.request(reqOptions5).then(function (res) {
             console.log(res.data);
          //
          const welcome_embed = new MessageEmbed()
          .setColor(`${bot_color}`)
          .setThumbnail(`${bot_logo}`)
          .setTitle('Thank you for adding me to your server !')
          .setDescription('`Useful commands:`')
          .addField(`/help`, '> Show all commands.')
          .addField(`/setup`, '> Show all setup commands.')
          .addField(`/inspect <userID>`, '> Checks if the user is blacklisted.')
          //.addField(`/advice`, '> Show random useful advice for server owner. **-SOON**')
          .setFooter(client.user.tag, client.user.displayAvatarURL( { dynamic: true } ))
          .setImage('https://i.imgur.com/TlNvTNW.png')
          .setTimestamp()
          //
          const welcome__support_server_embed = new MessageEmbed()
          .setColor(`${bot_color}`)
          .setDescription(`**SUPPORT SERVER:** https://bit.ly/stopthetrollers`)
          //
          const welcome__permissions_advice_embed = new MessageEmbed()
          .setColor(`${bot_color}`)
          .setDescription(`For a fully functional BOT, we recommend leaving the ` + '`ADMINISTRATOR`' + ` permissions.`)
          //
          const welcome_log_embed = new MessageEmbed()
          .setColor(`GREEN`)
          .setDescription(`:white_check_mark:  Guild added: **${guild.name}**  [` + '`' + `${res.data.id}` + '`' + ` / ` + '`' + `${res.data.username + '#' + res.data.discriminator}` + '`' + `] [${guild.memberCount}]`)
          .setFooter(`React ❌ to remove bot from this guild. ` )
          .setTimestamp()
          //
          if(!guild.systemChannel) {
            console.log('No system channel in ' + guild.name) 
            //console.log("---> " + client.users.cache.get(guild.ownerId))
            //client.users.cache.get(guild.ownerId).send(welcome_embed); 
            //client.users.cache.get(guild.ownerId).send(welcome__support_server_embed); 
            //client.users.cache.get(guild.ownerId).send(welcome__permissions_advice_embed)
            try {
              axios({
                method: 'post',
                url: 'http://95.156.227.203:5000/servers/',
                data: {
                  sid: guild.id,
                  owner_id: guild.ownerId,
                  owner_tag: res.data.username + "#" + res.data.discriminator
                }})
                console.log("Saving data success !")
                } catch (err) {
            console.log(err)
              }
              return;
          } else {
          guild.systemChannel.send({ content: `<@${guild.ownerId}>`, embeds: [welcome_embed, welcome__permissions_advice_embed, welcome__support_server_embed]});

          //
         axios.post('https://canary.discord.com/api/webhooks/912699228810272788/_oe9p6G6KxI64vN00gG6_t5AbENpTQ_5kU9KY2MKrCIYIDC9Ua91tZuJBaujXQwae6o0', {
            username: "STT | LOG",
            avatar_url: client.user.displayAvatarURL( { dynamic: true}),
	        embeds: [ welcome_log_embed ],
        })
         try {
            axios({
              method: 'post',
              url: 'http://95.156.227.203:5000/servers/',
              data: {
                sid: guild.id,
                owner_id: guild.ownerId,
                owner_tag: res.data.username + "#" + res.data.discriminator
              }})
              console.log("Saving data success !")
              } catch (err) {
          console.log(err)
            }
        }
          })
          
	},
};