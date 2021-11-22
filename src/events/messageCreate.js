const Discord = require('discord.js');
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
//
module.exports = {
    name: 'messageCreate',
	async execute(message) {
        console.log("NEW MESSAGE !")
        if(message.content.match(`^<@!?${client.user.id}>( |)$`)) {
        //
        const prefix_embed = new Discord.MessageEmbed()
        .setColor("#fe5b63")
            .setDescription(`**Report** use __SLASH COMMANDS__ (/)`)
            //
            message.reply(prefix_embed)
        }
    }
}