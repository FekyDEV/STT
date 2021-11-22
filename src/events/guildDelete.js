const axios = require('axios');
const { MessageEmbed } = require('discord.js');
//
module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
        //
        const left_server_embed = new MessageEmbed()
            .setAuthor(`Report left: ${guild.name} [${guild.memberCount}]`, 'https://cdn.discordapp.com/emojis/907254674401402920.gif?size=44')
            .setColor(`RED`)
            .setFooter("GUILD ID: " + guild.id)
            .setTimestamp()
        //
        if(client.uptime > 5000) {
            await axios.post("https://canary.discord.com/api/webhooks/907246848006316063/O-YkiN66-N20ULjwTzVL_EZpjguOB9_Wrwlvrp3p1lDfjgFTax17SfXkp-ruYZWJu31G", {
                username: "Report",
                avatar_url: client.user.avatarURL({ dynamic: true}),
                embeds: [ left_server_embed ],
            })
        } 
	},
};