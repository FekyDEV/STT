const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Display all commands.")
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')
        ),   

    async execute(interaction) {
        const help_embed = new Discord.MessageEmbed()
                .setFooter(`${bot_name}`, `${bot_logo}` )
                .setColor(`${bot_color}`)
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .setAuthor('Commands List', "https://cdn.discordapp.com/emojis/894988369795354656.png?size=96")
                .setDescription('`You must be a server staff to get more commands.`' + ' \n|~~------------------------------------------------------~~|')
                .addField('<:funny:894985690528509982> Fun', '`meme` `roulette` `8ball` `hack`', true)
                .addField('<:stt_pooperror:894987766046285854> NSFW', '~~none~~', true)
                .addField('<:stt_hastag:894863362284982273> General', '`inspect` `aboutbot` `profile` `avatar` `together` `info`', false)
                .addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Try new profile & together commands !__ \n<:stt_rules:896337630550167562> **TIP:** __Use commands for more XP!__")
                .setTimestamp()
              //
              const help_embed_staff = new Discord.MessageEmbed()
                .setFooter(`${bot_name}`, `${bot_logo}` )
                .setColor(`${bot_color}`)
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .setAuthor('Commands List', "https://cdn.discordapp.com/emojis/894988369795354656.png?size=96")
                .setDescription('`You also have moderation commands here.`' + ' \n|~~------------------------------------------------------~~|')
                .addField('<:stt_shield:894863362658283550> Moderation','`ban` `unban` `kick` `setup` ~~announce~~ ~~embed~~', false)
                .addField('<:funny:894985690528509982> Fun', '`meme` `roulette` `8ball` `hack`', true)
                .addField('<:stt_pooperror:894987766046285854> NSFW', '~~none~~', true)
                .addField('<:stt_hastag:894863362284982273> General', '`inspect` `aboutbot` `profile` `avatar` `together` `info`', false)
                .addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Try new profile & together commands !__ \n<:stt_rules:896337630550167562> **TIP:** __Use commands for more XP!__")
                .setTimestamp()          
          //
          const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setURL('https://discord.com/api/oauth2/authorize?client_id=904094843503013948&permissions=8&scope=bot%20applications.commands')
				.setLabel('Bot Invite') // OBSAH SPRAVY
				.setStyle('LINK'), // TYP TLACITKA
                //
                new MessageButton()
                .setURL('https://discord.com/invite/fWevHJYU8X')
				.setLabel('Support Discord') // OBSAH SPRAVY
				.setStyle('LINK'), // TYP TLACITKA
			);
        //
          const member = interaction.member
          //
          if(member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({
                embeds: [ help_embed_staff ],
                components: [row],
                ephemeral: interaction.options.getBoolean('hide')
            })
          } else {
            interaction.reply({
                embeds: [ help_embed ],
                components: [row],
                ephemeral: interaction.options.getBoolean('hide')
            })
          }
    }
}
