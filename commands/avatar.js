const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
//
const badges = require("discord-badges"); // DETECT USER BADGES
const moment = require('moment');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Show user avatar.")
        .addUserOption(option =>
            option.setName('mention')
                .setDescription('Mention a user')
                .setRequired(true))
                
                .addBooleanOption(option => option
                    .setName('hide')
                    .setDescription('Do you want to hide our interaction ?')
                    
                ),   

    async execute(interaction) {
       const user2 = interaction.options.getUser('mention')

        const info_embed = new Discord.MessageEmbed()
        .setTitle("**LINK**")
        .setURL(user2.avatarURL({ dynamic: true }))
        .setColor(bot_color)  
        .setDescription(user2.tag + "'s avatar.")
        .setImage(user2.avatarURL({ dynamic: true }))
        .setFooter(`${user2.tag}`, user2.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
          //
          const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setURL('https://cdn.discordapp.com/avatars/' + user2.id + '/' + user2.avatar + '.webp')
				.setLabel('User Avatar') // OBSAH SPRAVY
				.setStyle('LINK'), // TYP TLACITKA
                //
			);
            interaction.reply({
                embeds: [ info_embed ],
                components: [row],
                ephemeral: interaction.options.getBoolean('hide')
            })    
    }
}
