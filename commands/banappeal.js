const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, } = require('discord.js');
const bot_color = '0x370595';
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("banappeal")
        .setDescription("Ban Appeal for Blacklisted users. [BETA]")
        .addStringOption(option => option
            .setName('message')
            .setDescription('Message for Ban Appeal.')
            .setRequired(true)          
        ),   
    async execute(interaction, client, Discord) {
        const appeal_button = new MessageActionRow()
			    .addComponents(
				new MessageButton()
                .setCustomId('confirm_butn')
				.setLabel('Confirm') // OBSAH SPRAVY
				.setStyle('SUCCESS'), // TYP TLACITKA
                //
            new MessageButton()
                .setCustomId('rozdelovaci_butn')
				.setLabel('/') // OBSAH SPRAVY
				.setStyle('SECONDARY') // TYP TLACITKA
                .setDisabled(true),
                //
            new MessageButton()
                .setCustomId('cancel_butn')
				.setLabel('Cancel') // OBSAH SPRAVY
				.setStyle('DANGER'), // TYP TLACITKA
                //
          );
            //
       /* const confirm_banappeal_embed = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true }))
        .setTitle("WARNING !")
        .setTimestamp()
        .setFooter(bot_name, bot_logo)
        .setDescription('> You confirm that the information and proof you submitted is correct and not edited in any way. \n \n > You confirm that the images you submitted are fullscreen images \n \n __Breaking this will lead to a permanent blacklist.__ \n \n**+** __If you want to get an answer from the Staff, enable your DM !__')
       */ //
       const ban_appeal_embed = new MessageEmbed()
       .setColor(`${bot_color}`)
       .setTitle("Ban Appeal")
       .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${interaction.user.tag}⠀⠀⠀⠀⠀||${interaction.user.id}||`)
       //.setThumbnail("https://cdn.discordapp.com/avatars/" + "." + "/" + "." + ".png")
       .setImage('https://i.imgur.com/TlNvTNW.png')
       .addField("<:stt_shop:896337630378205196>  Appeal Message", `${interaction.options.getString('message')}`, false)
       .setFooter(`Date:`)
       .setTimestamp()
       //
       interaction.client.channels.fetch('913818592728993852')
       .then(channel => channel.send({ embeds: [ ban_appeal_embed ], components: [ appeal_button ]}).catch(console.error))
       .catch(console.error);
       ///
    
          //
         interaction.reply({
             content: ':white_check_mark: Ban Appeal sended!',
            //embeds: [  ],
            //components: [ row ],
            ephemeral: true
            
        })
        
    }
    
}
