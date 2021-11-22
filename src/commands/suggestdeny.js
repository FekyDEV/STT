const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const suggestconfig = require('../db/schemas/suggestconfig.js')
const suggest = require('../db/schemas/suggest.js')
const suggestmessage = require('../db/schemas/suggestmessage.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestdeny')
        .setDescription('Deny a suggestion (Moderators Only)')
        .addStringOption(option =>
            option.setName("id")
                .setDescription("the id of the suggestion")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("the reason you are accepting this suggestion")
                .setRequired(false)
        ),
    async execute(interaction) {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
            const data = await getSuggestionConfig(interaction.guild);
            const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
            const channel = interaction.guild.channels.cache.get(data.approveChannel);
            if (!channel) {
                return interaction.reply({ ephemeral: true, content: "This channel does not seem to exist." });
            } else if (!interaction.guild.me.permissionsIn(channel).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) {
                return interaction.reply({ ephemeral: true, content: "There is a permission error. Please ask the Server Moderators to look into it!" });
            } else {
                const suggestCode = interaction.options.get("id").value;

                const suggestion = await getSuggestion(interaction.guild, suggestCode);
                if (suggestion === false) {
                    return interaction.reply({ ephemeral: true, content: "We could not find the Suggestion... Try again!" })
                } else {

                    const suggestM = await getSuggestionMessage(interaction.guild, suggestCode)

                    let suggestApprove = new MessageEmbed()
                    .setTitle(`<:a:871419569472933918> Suggestion from ${suggestion.userName}`)
                        .setDescription("⠀**╚ was Denied !**")
                        .addField('Suggestion', `> ${suggestion.content}`)
                        .setFooter(`ID: ${suggestCode}`, info.iconURL({ format: "png" }))
                        .setTimestamp()
                        .setColor("RED")
                    if (interaction.options.get("reason")) {
                        suggestApprove.addField(`Reason`, `${interaction.options.get("reason").value}`)
                    }
                    interaction.client.channels.cache.get(data.denyChannel).send({ embeds: [suggestApprove] });
                    interaction.reply({ ephemeral: true, content: `You denied suggestion \`${suggestion.suggestID}\`` });
                    await removeSuggestion(interaction.guild, suggestCode);
                    await getSuggestionMessage(interaction.guild, suggestCode);
                    setTimeout(() => interaction.client.channels.cache.get(data.mainChannel).messages.delete(suggestM.messageID), 1000);
                    await removeSuggestionMessage(interaction.guild, suggestCode, suggestM.messageID);
                }

            }

        } else {
            await interaction.reply({ content: "<:deny:903254671584559144> You do not have the following permissions:\n\`MANAGE_SERVER\`", ephemeral: true });
        }
    }
}

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

async function getSuggestion(guild, suggestID) {
    let doc = await suggest.findOne({ guildID: { $eq: guild.id }, suggestID: { $eq: suggestID } });
    if (!doc) {
        return false;
    }
    return doc;
}

async function removeSuggestion(guild, suggestID) {
    let doc = await suggest.findOneAndDelete({ guildID: { $eq: guild.id }, suggestID: { $eq: suggestID } });
    if (doc) {
        return true;
    } else {
        return false;
    }
}

async function getSuggestionMessage(guild, suggestID) {
    let doc = await suggestmessage.findOne({ guildID: { $eq: guild.id }, suggestID: { $eq: suggestID } });
    if (!doc) {
        return false;
    }
    return doc;
}

async function removeSuggestionMessage(guild, suggestID, messageID) {
    let doc = await suggestmessage.findOneAndDelete({ guildID: { $eq: guild.id }, suggestID: { $eq: suggestID }, messageID: { $eq: messageID } });
    if (doc) {
        return true;
    } else {
        return false;
    }
}