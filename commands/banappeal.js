const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, Client, Intents } = require('discord.js');
//
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
//
const bot_color = '0x370595';
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("banappeal")
        .setDescription("Ban Appeal for Blacklisted users.")
        ,   
    async execute(interaction) {
        const confirm_embed = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true }))
        .setTitle("WARNING !")
        .setTimestamp()
        .setFooter(bot_name, bot_logo)
        .setDescription('> You confirm that the information and proof you submitted is correct and not edited in any way. \n \n > You confirm that the images you submitted are fullscreen images \n \n __Breaking this will lead to a permanent blacklist.__ \n \n**+** __If you want to get an answer from the Staff, enable your DM !__')
        //
    const row = new MessageActionRow()
		.addComponents(
		   new MessageButton()
            .setCustomId('accept_banappeal')
			.setLabel('ACCEPT') 
			.setStyle('SUCCESS'), 
                //
            new MessageButton()
                .setCustomId('inspect_banappeal')
                .setDisabled(true)
			    .setLabel('inspect') 
			    .setStyle('SECONDARY'), 
                //
             new MessageButton()
                .setCustomId('deny_banappeal')
			    .setLabel('DENY') 
			    .setStyle('DANGER'), 
		    );
          //
         interaction.reply({
            embeds: [ confirm_embed ],
            components: [row],
            ephemeral: true
        })
	    
    }
}
client.on("interactionCreate", async (interaction) => {

    if(interaction.customId === "accept_banappeal"){
        console.log("Ban Appeal sended !")
        //
    /*    const ban_appeal_embed = new MessageEmbed()
        .setColor(`${bot_color}`)
        .setTitle("Report | ID: " + ".")
        .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n $⠀⠀⠀⠀⠀||$||`)
        .setThumbnail("https://cdn.discordapp.com/avatars/" + "." + "/" + "." + ".png")
        .setImage('https://i.imgur.com/TlNvTNW.png')
        .addField("<:stt_ticket:894863362503110678> Reported User Name", `$`,true)
        .addField("<:stt_id:903032294590255106> Reported User ID", `||$ ||`,true)
        .addField("<:stt_shop:896337630378205196>  Report Message", `$ \n \n $`, false)
        .setFooter(`Date: $`, 'https://cdn.discordapp.com/emojis/906514271217811467.png?size=96' )
        .setTimestamp()
        //
        interaction.reply({
            embeds: [ ban_appeal_embed ],
            components: [ ],
            ephemeral: true
        })*/
    }
    if(interaction.customId === "deny_banappeal"){
        console.log("Ban Appeal denied !")
    }
});
