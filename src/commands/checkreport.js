const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const premium = require('../db/schemas/premium.js');
const report = require('../db/schemas/report.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkreport')
		.setDescription('Check the details of a report')
        .addStringOption(option =>
            option.setName("id")
                .setDescription("The ID of the Report")
                .setRequired(true)
        )
		.addStringOption(option =>
			option.setName("show")
			.setDescription("Whether to show the response or not")
			.setRequired(false)
		),
	async execute(interaction) {

		if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			var premiumData = await getPremiumStatus(interaction.guild);
			if (premiumData.status == true) {
				var reportID = interaction.options.get("id").value;
				var data = await getReport(interaction.guild, reportID);
				if(data == false) {
					await interaction.reply({ ephemeral: true, content: "Sorry. This report does not exist`" });
				} else {
					const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
					const embed = new MessageEmbed()
					.setColor("#F45B69")
					.setTitle(`Report: ${reportID}`)
					.addField("Content:", data.content)
					.addField("User:", data.rUser, true)
					.addField("User ID:", data.rID, true)
					.setFooter(interaction.guild.name, info.iconURL({ format: "png" }))
					.setTimestamp()
					await interaction.reply({ ephemeral: true, embeds: [embed] });
					
				}
			} else {
				await interaction.reply({ ephemeral: true, content: "This server does not have premium" });
			}
		} else {
			await interaction.reply({ ephemeral: true, content: "Sorry. You do not have access to the following permissions:\n\`MANAGE_MESSAGES\`" });
		}
	},
};

async function getReport(guild, id) {
    let doc = await report.findOne({ guildID: { $eq: guild.id }, id: { $eq: id } });
    if (!doc) {
        return false;
    }
    return doc;
}

async function getPremiumStatus(guild) {
    if (guild.premium && guild.cache?.premium) return guild.premium;
    let doc = await premium.findOne({ guildID: { $eq: guild.id } });
    if (!doc) {
        doc = await premium.create({
            guildID: guild.id,
            status: false,
        });
    }
    guild.premium = doc;
    if (!guild.cache) guild.cache = {};
    guild.cache.premium = true;
    return doc;
}