const axios = require('axios');
const { MessageEmbed } = require('discord.js');
//
module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
        let headersList5 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions5 = {
             url: "https://discord.com/api/users/" + guild.ownerID,
             method: "GET",
             headers: headersList5,
           }
           axios.request(reqOptions5).then(function (res) {
             console.log(res.data);
          //
          const welcome_embed = new Discord.MessageEmbed()
          .setColor(`${bot_color}`)
          .setThumbnail(`${bot_logo}`)
          .setTitle('Thank you for adding me to your server !')
          .setDescription('`Useful commands:`')
          .addField(`${prefix}help`, '> Show all commands.')
          .addField(`${prefix}setup`, '> Show all setup commands.')
          .addField(`${prefix}inspect <userID>`, '> Checks if the user is blacklisted.')
          //.addField(`${prefix}advice`, '> Show random useful advice for server owner. **-SOON**')
          .setFooter(`${bot_name}`, `${bot_logo}` )
          .setImage('https://i.imgur.com/TlNvTNW.png')
          .setTimestamp()
          //
          const welcome__support_server_embed = new Discord.MessageEmbed()
          .setColor(`${bot_color}`)
          .setDescription(`**SUPPORT SERVER:** https://bit.ly/stopthetrollers`)
          //
          const welcome__permissions_advice_embed = new Discord.MessageEmbed()
          .setColor(`${bot_color}`)
          .setDescription(`For a fully functional BOT, we recommend leaving the ` + '`ADMINISTRATOR`' + ` permissions.`)
          //
          const welcome_log_embed = new Discord.MessageEmbed()
          .setColor(`${green_color}`)
          .setDescription(`:white_check_mark:  Guild added: **${guild.name}**  [` + '`' + `${res.data.id}` + '`' + ` / ` + '`' + `${res.data.username + '#' + res.data.discriminator}` + '`' + `] [${guild.memberCount}]`)
          .setFooter(`React ❌ to remove bot from this guild. ` )
          .setTimestamp()
          //
          if(!guild.systemChannel) {
            console.log('No system channel in ' + guild.name) 
            client.users.cache.get(guild.ownerID).send(welcome_embed); 
            client.users.cache.get(guild.ownerID).send(welcome__support_server_embed); 
            client.users.cache.get(guild.ownerID).send(welcome__permissions_advice_embed)
            try {
              axios({
                method: 'post',
                url: 'http://95.156.227.203:5000/servers/',
                data: {
                  sid: guild.id,
                  owner_id: guild.ownerID,
                  owner_tag: res.data.username + "#" + res.data.discriminator
                }})
                console.log("Saving data success !")
                } catch (err) {
            console.log(err)
              }
              return;
          } 
          guild.systemChannel.send(`<@${guild.ownerID}>`);
          guild.systemChannel.send(welcome_embed);
          guild.systemChannel.send(welcome__permissions_advice_embed);
          guild.systemChannel.send(welcome__support_server_embed);
          client.channels.cache.get('870001541879316490').send(welcome_log_embed)//.then(function (message) {message.react("❌") })
         try {
            axios({
              method: 'post',
              url: 'http://95.156.227.203:5000/servers/',
              data: {
                sid: guild.id,
                owner_id: guild.ownerID,
                owner_tag: res.data.username + "#" + res.data.discriminator
              }})
              console.log("Saving data success !")
              } catch (err) {
          console.log(err)
            }
          })
	},
};