require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = "OTAxMTY2MDc0NTg0NzkzMDg4.YXL6Tw.fDsAUkhfhr-SBDj11bDjZ_4IEyA";
const clientId = "901166074584793088";
const guildId = '860183004894855189';
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationCommands(clientId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
            console.log(deleteUrl);
            // promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    })
    // .then(rest.put(Routes.applicationCommands(clientId), { body: commands }))