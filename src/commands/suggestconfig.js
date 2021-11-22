const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const suggestconfig = require('../db/schemas/suggestconfig.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestconfig')
        .setDescription('Configure the suggestion module.')
        .addSubcommand(subcommand =>
            subcommand
                .setName("get")
                .setDescription("Get the current suggestion configuration."))
        .addSubcommand(subcommand =>
            subcommand
                .setName("enable")
                .setDescription("Enable or Disable the suggestion system.")
                .addBooleanOption(option => option.setName("value").setDescription("either true or false").setRequired(true))
                .addChannelOption(option => option.setName("channel").setDescription("tag the channel").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("message")
                .setDescription("A custom thank you suggestion message.")
                .addStringOption(option => option.setName("message").setDescription("the message here").setRequired(true))
        )
        /*.addSubcommand(subcommand =>
            subcommand
                .setName("channel")
                .setDescription("The channel where the suggestions will go")
                .addChannelOption(option => option.setName("channel").setDescription("tag the channel").setRequired(true))
        )*/
        .addSubcommand(subcommand =>
            subcommand
                .setName("approvechannel")
                .setDescription("The channel where the approved channels.")
                .addChannelOption(option => option.setName("channel").setDescription("taag the channel").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("denychannel")
                .setDescription("The channel where the denied suggestions will go.")
                .addChannelOption(option => option.setName("channel").setDescription("taag the channel").setRequired(true))
        ),
    async execute(interaction) {

        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            switch (interaction.options.getSubcommand()) {
                case 'get':
                default: {
                    const data = await getSuggestionConfig(interaction.guild);
                    const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
                    const embed = new MessageEmbed()
                        .setTitle("Suggestion System Config")
                        .setColor("#fe5b63")
                        .setDescription("__This is the Suggestion System configuration page.__\n\n> To edit a setting, use: \`/suggestconfig <name> <value>\`")
                        .addField("Suggestion Enabled (enable)", data.enabled ? "> <:a:871419569426804796> Enabled" : "> <:a:871419569472933918> Disabled")
                        .addField("Suggestion Message (message)", `> \`${data.text}\``)
                        .addField("Suggestion Logs Channel (channel)", data.mainChannel ? ("> <#" + data.mainChannel + ">") : "Not Set Yet")
                        .addField("Suggestion Approve Logs Channel (approvechannel)", data.approveChannel ? ("<#" + data.approveChannel + ">") : "Not Set Yet")
                        .addField("Suggestion Denied Logs Channel (denychannel)", data.denyChannel ? ("<#" + data.denyChannel + ">") : "Not Set Yet")
                        .setFooter('/suggestconfig <name> <value>', info.iconURL({ format: "png" }));
                    await interaction.reply({ embeds: [embed], ephemeral: true, });
                    break;
                }
                case 'enable': {
                    const log_chnl = interaction.options.getChannel('channel')
                    if(log_chnl.type !== 'GUILD_TEXT') return  interaction.reply({ content: 'You have to choose **Text Channel** !', ephemeral: true })
                    var channel = interaction.options.getChannel("channel", true);
                    if (!channel.permissionsFor(interaction.client.user.id).has(["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"]))
                        return interaction.reply("I don't have the `MANAGE_CHANNELS`, the `MANAGE_ROLES` or the `VIEW_CHANNEL` permission in that channel.");
                    await editSuggestionConfig(interaction.guild, 2, channel.id);
                    await editSuggestionConfig(interaction.guild, 0, interaction.options.get("value").value);
                    await interaction.reply({ content: `**Suggestions Channel** updated to:\n<#${channel.id}>`, ephemeral: true, });
                    break;
                }
                case 'message': {
                    await editSuggestionConfig(interaction.guild, 1, interaction.options.get("message").value);
                    await interaction.reply({ content: `**Suggestion Message** updated to:\n${interaction.options.get("message").value}`, ephemeral: true, });
                    break;
                }
               /* case 'channel': {
                    var channel = interaction.options.getChannel("channel", true);
                    if (!channel.permissionsFor(interaction.client.user.id).has(["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"]))
                        return interaction.reply("I don't have the `MANAGE_CHANNELS`, the `MANAGE_ROLES` or the `VIEW_CHANNEL` permission in that channel.");
                    await editSuggestionConfig(interaction.guild, 2, channel.id);
                    await interaction.reply({ content: `**Suggestions Channel** updated to:\n<#${channel.id}>`, ephemeral: true, });
                    break;
                }*/
                case 'approvechannel': {
                    const log_chnl = interaction.options.getChannel('channel')
                    if(log_chnl.type !== 'GUILD_TEXT') return  interaction.reply({ content: 'You have to choose **Text Channel** !', ephemeral: true })
                    var channel = interaction.options.getChannel("channel", true);
                    if (!channel.permissionsFor(interaction.client.user.id).has(["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"]))
                        return interaction.reply("I don't have the `MANAGE_CHANNELS`, the `MANAGE_ROLES` or the `VIEW_CHANNEL` permission in that channel.");
                    await editSuggestionConfig(interaction.guild, 3, channel.id);
                    await interaction.reply({ content: `**Approved Suggestions Channel** updated to:\n<#${channel.id}>`, ephemeral: true, });
                    break;
                }
                case 'denychannel': {
                    const log_chnl = interaction.options.getChannel('channel')
                    if(log_chnl.type !== 'GUILD_TEXT') return  interaction.reply({ content: 'You have to choose **Text Channel** !', ephemeral: true })
                    var channel = interaction.options.getChannel("channel", true);
                    if (!channel.permissionsFor(interaction.client.user.id).has(["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"]))
                        return interaction.reply("I don't have the `MANAGE_CHANNELS`, the `MANAGE_ROLES` or the `VIEW_CHANNEL` permission in that channel.");
                    await editSuggestionConfig(interaction.guild, 4, channel.id);
                    await interaction.reply({ content: `**Denied Suggestions Channel** updated to:\n<#${channel.id}>`, ephemeral: true, });
                    break;
                }
            }
        } else {
            await interaction.reply({ content: "<:deny:903254671584559144> You do not have the following permissions:\n\`MANAGE_SERVER\`", ephemeral: true });
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

async function editSuggestionConfig(guild, tochange, newData) {
    const doc = await getSuggestionConfig(guild);
    switch (tochange) {
        case 0: { // enabled
            await doc.updateOne({ enabled: newData });
            guild.suggestconfig.enabled = newData;
        }
            break;
        case 1: { // message
            await doc.updateOne({ text: newData });
            guild.suggestconfig.text = newData;
        }
            break;
        case 2: { // logs channel
            await doc.updateOne({ mainChannel: newData });
            guild.suggestconfig.mainChannel = newData
        }
            break;
        case 3: { // accept channel
            await doc.updateOne({ approveChannel: newData });
            guild.suggestconfig.approveChannel = newData
        }
            break;
        case 4: { // deny channel
            await doc.updateOne({ denyChannel: newData });
            guild.suggestconfig.denyChannel = newData
        }
            break;
        default:
            throw new Error("Nope");
    }
    return true;
}