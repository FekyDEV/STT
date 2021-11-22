require('dotenv').config()
const fs = require('fs');
const chalk = require('chalk');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const client = new Client({ 
	intents: [Intents.FLAGS.GUILDS],
});

// ? MongoDB Stuff

async function loadDB() {
	const mongoose = require('mongoose');
	await mongoose.connect("mongodb://localhost/Report-DEV", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() =>{
		console.log(chalk.green('Connected to the database!'));
	}).catch((err) => {
		console.log(err);
	});
}

loadDB();

// ? Adding Slash Commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];
const empty = [];
const SlashFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of SlashFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const clientId3 = '901166074584793088'
    const guildId3 = '904096336171905045'
    //const guildId2 = ;
    const rest = new REST({
        version: "9"
    }).setToken('OTAxMTY2MDc0NTg0NzkzMDg4.YXL6Tw.fDsAUkhfhr-SBDj11bDjZ_4IEyA');
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId3, guildId3),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();


// ? Command Handler
client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// ? Event Handler
const eventFiles = fs.readdirSync(__dirname + '/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login("OTAxMTY2MDc0NTg0NzkzMDg4.YXL6Tw.fDsAUkhfhr-SBDj11bDjZ_4IEyA");