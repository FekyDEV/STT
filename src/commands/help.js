const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays a list of the bot commands.')
    .addBooleanOption(option => option
      .setName('hide')
      .setDescription('Do you want to hide our interaction ?')
  ),
	async execute(interaction) {
    //
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setURL('https://docs.nerdbots.xyz/report/getting-started')
				.setLabel('BOT DOCS') // OBSAH SPRAVY
				.setStyle('LINK'), // TYP TLACITKA
                //
                new MessageButton()
                .setURL('https://discord.gg/sKKEyUn')
				.setLabel('Support Discord') // OBSAH SPRAVY
				.setStyle('LINK'), // TYP TLACITKA
			);
      //
        await interaction.reply({
            embeds: [new MessageEmbed()
              .setTitle("Help")
              .setColor("#fe5b63")
              .setDescription("To get started or get help with **Report**, please: \n \n> Visit the DOCS \n or \n> Join our Support Discord \n \n __Every command is registered as a (/) command.__")
              .addField('<:a:894863362251427881> Sponsored by Hyper Layer', 'We are proudly sponsored by [Hyper Layer](https://billing.hyperlayer.net/aff.php?aff=3), a premiere hosting company that offers Discord bot hosting, web hosting, game servers and much much more!')
              .setFooter(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true } ))
              .setTimestamp()
            
            ],
            components: [ row ],
            ephemeral: interaction.options.getBoolean('hide')
          });
	},
};