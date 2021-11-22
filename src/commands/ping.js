const { SlashCommandBuilder } = require('@discordjs/builders');
//
const moment = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with BOT ping!'),
	async execute(interaction) {
		//
		const member = interaction.member
        const ping_ping = `${Date.now() - interaction.createdTimestamp}`
        //
        const ping = []
        if(ping_ping < 80) {
            ping.push("<:stt_connection_best:896337630608908308>")
          }
          if(ping_ping >= 80) {
            ping.shift();
            ping.push("<:stt_connection_good:896337630525009981>")
          }
          if(ping_ping >= 125) {
            ping.shift();
            ping.shift();
            ping.push("<:stt_connection_bad:896337630520836136>")
          }
		  //

		await interaction.reply({content: `${ping} Ping ` + '`' + `${Date.now() - interaction.createdTimestamp}` + '`' + `ms`, ephemeral: true });
	},
};