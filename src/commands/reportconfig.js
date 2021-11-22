const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const reportconfig = require('../db/schemas/reportconfig.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reportconfig')
        .setDescription('Configure report')
        .addSubcommand(subcommand =>
            subcommand
                .setName("get")
                .setDescription("Get the current report configuration"))
        .addSubcommand(subcommand =>
            subcommand
                .setName("enable")
                .setDescription("Enable or Disable the report system")
                .addBooleanOption(option => option.setName("value").setDescription("either true or false").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("message")
                .setDescription("A custom thank you message")
                .addStringOption(option => option.setName("message").setDescription("the message here").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("channel")
                .setDescription("The channel where the reports will go")
                .addChannelOption(option => option.setName("channel").setDescription("tag the channel").setRequired(true))
        ),
    async execute(interaction) {
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {

            switch (interaction.options.getSubcommand()) {
                case 'get':
                default: {
                    const data = await getReportConfig(interaction.guild);
                    const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
                    const embed = new MessageEmbed()
                        .setTitle("Report System Config")
                        .setColor("#fe5b63")
                        .setDescription("__This is the Report System configuration page.__\n\n> To edit a setting, use: \`/reportconfig <name> <value>\`\n\nAny command marked with <:customcrown:892752590595571722> are reserved for **Premium Users**")
                        .addField("Report System Status (enable)", data.enabled ? "> <:a:871419569426804796> Enabled" : "> <:a:871419569472933918> Disabled")
                        .addField("Report Log Channel (channel)", data.channel ? ("> <#" + data.channel + ">") : "> Not Set Yet")
                        .addField("Report Message (message)", `> \`${data.text}\``)
                        .addField("<:customcrown:892752590595571722> Mention Report (mention)", data.mention ? "Yes" : "No")
                        .addField("<:customcrown:892752590595571722> Mention Role Report (mentionRole)", data.mentionRole ? ("<@&" + data.mentionRole + ">") : "Not Set Yet")
                        .addField("<:customcrown:892752590595571722> Ticket Staff Role (staffRole)", data.staffRole ? ("<@&" + data.staffRole + ">") : "Not Set Yet")
                        .addField("<:customcrown:892752590595571722> Ticket Category (ticketCategory)", data.ticketCategory ? ("\`" + data.ticketCategory + "\`") : "Not Set Yet")
                        .setFooter('/reportconfig <name> <value>', info.iconURL({ format: "png" }));
                    await interaction.reply({ embeds: [embed], ephemeral: true, });
                    break;
                }
                case 'enable': {
                    await editReportConfig(interaction.guild, 0, interaction.options.get("value").value);
                    await interaction.reply({ content: `**Report System Status**:\n${interaction.options.get("value").value ? "Enabled" : "Disabled"}`, ephemeral: true, });
                    break;
                }
                case 'channel': {
                    const log_chnl = interaction.options.getChannel('channel')
                    if(log_chnl.type !== 'GUILD_TEXT') return  interaction.reply({ content: 'You have to choose **Text Channel** !', ephemeral: true })
                    if (!interaction.options.getChannel("channel", true).permissionsFor(interaction.client.user.id).has(["VIEW_CHANNEL", "MANAGE_CHANNELS", "MANAGE_ROLES"]))
                        return interaction.reply("I don't have the `MANAGE_CHANNELS`, the `MANAGE_ROLES` or the `VIEW_CHANNEL` permission in that channel.");
                    await editReportConfig(interaction.guild, 1, interaction.options.getChannel("channel", true).id);
                    await interaction.reply({ content: `**Report Channel** updated to:\n<#${interaction.options.getChannel("channel", true).id}>`, ephemeral: true, });
                    break;
                }
                case 'message': {
                    await editReportConfig(interaction.guild, 2, interaction.options.get("message").value);
                    await interaction.reply({ content: `**Report Message** updated to:\n${interaction.options.get("message").value}`, ephemeral: true, });
                    break;
                }
            }

        } else {
            await interaction.reply({ content: "<:deny:903254671584559144> You do not have the following permissions:\n\`MANAGE_SERVER\`", ephemeral: true });
        }
    },
};

async function getReportConfig(guild) {
    let doc = await reportconfig.findOne({ guildID: { $eq: guild.id } });
    if (!doc) {
        doc = await reportconfig.create({
            guildID: guild.id
        });
    }
    guild.reportconfig = doc;
    if (!guild.cache) guild.cache = {};
    guild.cache.reportconfig = true;
    return doc;
}

async function editReportConfig(guild, tochange, newData) {
    const doc = await getReportConfig(guild);
    switch (tochange) {
        case 0: { // enabled
            await doc.updateOne({ enabled: newData });
            guild.reportconfig.enabled = newData;
        }
            break;
        case 1: { // report channel
            await doc.updateOne({ channel: newData });
            guild.reportconfig.channel = newData;
        }
            break;
        case 2: { // report message
            await doc.updateOne({ text: newData });
            guild.reportconfig.text = newData
        }
            break;
        case 3: { // mention
            await doc.updateOne({ mention: newData });
            guild.reportconfig.mention = newData
        }
            break;
        case 4: { // mention role
            await doc.updateOne({ mentionRole: newData });
            guild.reportconfig.mentionRole = newData
        }
            break;
        case 5: { // staff role
            await doc.updateOne({ staffRole: newData });
            guild.reportconfig.staffRole = newData
        }
            break;
        case 6: { // ticket category
            await doc.updateOne({ ticketCategory: newData });
            guild.reportconfig.ticketCategory = newData
        }
            break;
        default:
            throw new Error("Nope");
    }
    return true;
}
