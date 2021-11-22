const { SlashCommandBuilder } = require('@discordjs/builders');
const GuildSchema = require('../db/schemas/Guild');
const { Permissions } = require('discord.js');
//
const axios = require("axios");
const { MessageEmbed } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add your server to the dashboard. [BETA]'),
	async execute(interaction) {
		if (interaction.member.permissions.has('MANAGE_GUILD')) {
            const guild = await GuildSchema.findOne({guildID: interaction.guild.id});
            if(guild) {
                await interaction.reply({ content: "Your server is already registered!", ephemeral: true });
            } else {
                doc = await GuildSchema.create({
                    guildID: interaction.guild.id,
                });
        //
        const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        //
        const add_dashboard_embed = new MessageEmbed()
            .setAuthor(`Owner of: ${interaction.guild.name}, is interested about Dashboard.`, 'https://cdn.discordapp.com/emojis/907269864396304416.gif?size=44')
            .setColor(`BLUE`)
            .setFooter("GUILD ID: " + interaction.guild.id)
            .setTimestamp()
        //
        await axios.post("https://canary.discord.com/api/webhooks/907246848006316063/O-YkiN66-N20ULjwTzVL_EZpjguOB9_Wrwlvrp3p1lDfjgFTax17SfXkp-ruYZWJu31G", {
            username: "Report",
            avatar_url: info.iconURL({ format: "png" }),
            embeds: [ add_dashboard_embed],
        })
                await interaction.reply({ content: "✅ I added your guild to the dashboard database.", ephemeral: true });
            }
        } else {
            await interaction.reply({ content: "<:deny:903254671584559144> You do not have the following permissions:\n\`MANAGE_SERVER\`", ephemeral: true });
        }
	},
};