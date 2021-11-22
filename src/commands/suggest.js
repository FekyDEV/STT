const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const suggestconfig = require('../db/schemas/suggestconfig.js')
const suggest = require('../db/schemas/suggest.js')
const suggestmessage = require('../db/schemas/suggestmessage.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Send a suggestion.')
        .addStringOption(option =>
            option.setName("message")
                  .setDescription("The message you want to submit ! [DEV]")
                  .setRequired(true)
            ),
	async execute(interaction) {
		const data = await getSuggestionConfig(interaction.guild);
        const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        const channel = await interaction.guild.channels.cache.get(data.mainChannel);
        if(!channel) {
            return await interaction.reply({ephemeral: true, content: "This channel does not seem to exist."});
        } else if(data.enabled === true) {
            if(interaction.guild.me.permissionsIn(channel).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) {
                const suggestMessage = interaction.options.getString("message", true);
                //const suggestCode = Math.random().toString(36).substr(2, 12);
                function create_ID() {
                    var txt = "";
                    var num = "0123456789";
                  
                    for (var i = 0; i < 6; i++)
                    txt += num.charAt(Math.floor(Math.random() * num.length));
                
                    return txt;
                  }
                  const suggestCode = create_ID()
                //

                let newData = new suggest({
                    guildID: interaction.guild.id,
                    content: suggestMessage,
                    suggestID: suggestCode,
                    userName: interaction.user.username,
                    userID: interaction.user.id,
                });
                newData.save();
                
                let suggestNew = new MessageEmbed()
                    .setTitle(`<:a:871419569460379668> Suggestion from ${interaction.user.tag}`)
                    .setThumbnail(interaction.user.displayAvatarURL( { dynamic: true } ))
                    .setDescription(`> ${suggestMessage}`)
                    .setFooter(`ID: ${suggestCode}`, info.iconURL({ format: "png" }))
                    .setTimestamp()
                    .setColor("#fe5b63")
                //
                await interaction.reply({ephemeral: true, content:`Thank you for the suggestion!`});
                //
                /*const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('upvote')
                    .setLabel('Upvote') 
                    .setStyle('SUCCESS'), 
                    //
                    new MessageButton()
                    .setCustomId('nothiiing')
                    .setLabel('/') 
                    .setDisabled(true)
                    .setStyle('SECONDARY'), 
                    //
                    new MessageButton()
                    .setCustomId('downvote')
                    .setLabel('Downvote') 
                    .setStyle('DANGER'), 
                    //
                );*/
                //
                await channel.send({embeds: [suggestNew]/*, components: [ row ]*/ }).then(sent => {
                    sent.react("👍");
                    sent.react("👎");
                  let newDataTwo = new suggestmessage({
                    guildID: interaction.guild.id,
                    suggestID: suggestCode,
                    messageID: sent.id,
                  })
                  newDataTwo.save();
                });
            } else {
                return await interaction.reply({ephemeral: true, content: "There is a permission error. Please ask the Server Moderators to look into it!"});
            }
        }
	},
};

async function getSuggestionConfig(guild) {
    if (guild.suggestconfig && guild.cache?.suggestconfig) return guild.suggestconfig;
    let doc = await suggestconfig.findOne({ guildID: { $eq: guild.id } });
    if (!doc) {
        doc = await suggestconfig.create({
            guildID: guild.id
        })
    } else {
        guild.suggestconfig = doc;
        if (!guild.cache) guild.cache = {};
        guild.cache.suggestConfig = true;
    }
    return doc;
}