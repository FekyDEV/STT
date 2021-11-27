const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
//
const bot_color = '0x370595';
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display all commands.")
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')
        ),   
    async execute(interaction) {
        const help_embed = new MessageEmbed()
                .setFooter(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true } ))
                .setTimestamp()
                .setColor(`${bot_color}`)
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .setAuthor('Commands List', "https://cdn.discordapp.com/emojis/894988369795354656.png?size=96")
		//
                if(interaction.member.permissions.has("MANAGE_MESSAGES")) {
                    help_embed.setDescription('`You also have moderation commands here.`' + ' \n|~~------------------------------------------------------~~|')
                    help_embed.addField('<:stt_shield:894863362658283550> Moderation','`setup`', false)
                  } else {
                    help_embed.setDescription('`You must be a server staff to get more commands.`' + ' \n|~~------------------------------------------------------~~|')
                  }
		//
                //.addField('<:funny:894985690528509982> Fun', '`meme` `roulette` `8ball` `hack`', true)
                //.addField('<:stt_pooperror:894987766046285854> NSFW', '~~none~~', true)
                help_embed.addField('<:stt_hastag:894863362284982273> General', '`inspect` `aboutbot` `profile` `avatar` `info`', false)
                help_embed.addField('<:stt_shop:896337630378205196> Reporting', '`reportuser`', false)
                help_embed.addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Try new profile commands !__ [BETA] \n<:stt_rules:896337630550167562> **TIP:** __Use commands for more XP!__")
          //
          const row = new MessageActionRow()
		.addComponents(
		   new MessageButton()
               		.setURL('https://discord.com/api/oauth2/authorize?client_id=904094843503013948&permissions=8&scope=bot%20applications.commands')
			.setLabel('Bot Invite') 
			.setStyle('LINK'), 
                //
                  new MessageButton()
                	.setCustomId('none')
                	.setDisabled(true)
			.setLabel('/') 
			.setStyle('SECONDARY'), 
                //
                  new MessageButton()
                	.setURL('https://discord.com/invite/fWevHJYU8X')
			.setLabel('Support Discord') 
			.setStyle('LINK'), 
		);
          //
         interaction.reply({
            embeds: [ help_embed ],
            components: [row],
            ephemeral: interaction.options.getBoolean('hide')
        })
	    
    }
}
