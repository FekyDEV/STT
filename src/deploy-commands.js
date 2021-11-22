const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken("OTAxMTY2MDc0NTg0NzkzMDg4.YXL6Tw.fDsAUkhfhr-SBDj11bDjZ_4IEyA");

rest.put(
	Routes.applicationCommands("901166074584793088"),
	{ body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { token } = require('./config.json');
// const fs = require('fs');

// const commands = [];
// const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

// // Place your client and guild ids here
// const clientId = '723251320705777694';
// const guildId = '876543210987654321';

// for (const file of commandFiles) {
// 	const command = require(__dirname + `/commands/${file}`);
// 	commands.push(command.data.toJSON());
// }

// const rest = new REST({ version: '9' }).setToken(token);

// (async () => {
// 	try {
// 		console.log('Started refreshing application (/) commands.');

// 		await rest.put(
// 			Routes.applicationCommands(clientId),
// 			{ body: commands },
// 		);

// 		console.log('Successfully reloaded application (/) commands.');
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();