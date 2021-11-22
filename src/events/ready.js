const chalk = require('chalk');
const axios = require('axios');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(chalk.yellow(`Ready! Logged in as ${client.user.tag}`));
		//
		const botStatus = [
						`Creating new Features...`,
						`Creating Reports !`,
						`/help`,
	  					  ];
	  //
	  setInterval(function() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(`${status}`, { type: 'COMPETING' });
	}, 10500);

	},
};