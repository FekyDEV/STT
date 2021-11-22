const axios = require('axios');
const { MessageEmbed } = require('discord.js');
//
module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
        //
        const new_server_embed = new MessageEmbed()
            .setAuthor(`Report joined: ${guild.name} [${guild.memberCount}]`, 'https://cdn.discordapp.com/emojis/907254674619506698.gif?size=44')
            .setColor(`GREEN`)
            .setFooter("GUILD ID: " + guild.id)
            .setTimestamp()
        //
        await axios.post("https://canary.discord.com/api/webhooks/907246848006316063/O-YkiN66-N20ULjwTzVL_EZpjguOB9_Wrwlvrp3p1lDfjgFTax17SfXkp-ruYZWJu31G", {
            username: "Report",
            avatar_url: client.user.displayAvatarURL( { dynamic: true}),
            //content: `**Report** joined ${guild.name} (${guild.id})`,
            embeds: [ new_server_embed ],
        })
	},
};