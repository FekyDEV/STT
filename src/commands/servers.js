const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('servers')
		.setDescription('Sends some useful information.'),
	async execute(interaction) {
    const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        var servers;
        await interaction.client.shard.fetchClientValues('guilds.cache.size')
        .then(results => {
            servers = results.reduce((acc, guildCount) => acc + guildCount, 0);
        })
        .catch(console.error);
        const serverEmbed = new MessageEmbed()
          .setDescription(`> At the moment I'm in **${servers}** servers !`, true)
          .setColor("#fe5b63")
          .setTimestamp()
          .setFooter(info.name, info.iconURL({ format: "png" }))
        await interaction.reply({ embeds: [serverEmbed], ephemeral: true });
	},
};