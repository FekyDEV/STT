const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
//
const bot_color = '0x370595';
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Display Leaderboard.")
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')
        ),   
    async execute(interaction) {
	    interaction.reply({
            content: 'test'
        })
    }
}
