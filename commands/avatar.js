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
        .addUserOption(option => option
            .setName('mention')
            .setDescription('Mention a user')
            .setRequired(true)) 
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')
        ),   
    async execute(interaction) {
       const user2 = interaction.options.getUser('mention')
       let avatar_type = ""
       let is_gif = ""
    //
       if(interaction.user.displayAvatarURL({ dynamic: true }).includes(".gif")){
        avatar_type = ".gif"
        is_gif = "<:Yes:871419569426804796>"
       } else {
        avatar_type = ".webp"
        is_gif = "<:No:871419569472933918>"
       }
    //
        const info_embed = new Discord.MessageEmbed()
        .setColor(bot_color)  
        .setDescription('> ' + user2.tag + "'s avatar. \n \n **Gif ?** " + is_gif)
        .setImage(user2.avatarURL({ dynamic: true }))
        .setFooter(`${user2.tag}`, user2.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
          //
          const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setURL('https://cdn.discordapp.com/avatars/' + user2.id + '/' + user2.avatar + avatar_type)
				.setLabel('LINK')
				.setStyle('LINK'), 
                //
			);
            //
            interaction.reply({
                embeds: [ info_embed ],
                components: [row],
                ephemeral: interaction.options.getBoolean('hide')
            })    
    }
}
