/** @format */

//
//const Discord = require("discord.js");
const config = require("./Data/config.json");
const bot_color = '0x370595';
//
const staff_member_role_id = '603505971507101698';
const author_role_id = '603505971507101698';
// SLASH
const fs = require('fs');
const axios = require("axios")
const Discord = require("discord.js");
const { REST } = require('@discordjs/rest'); // OVERENE
const { Routes } = require('discord-api-types/v9'); // OVERENE
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES
		]
	});
//
//
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}
//
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
//

client.on("ready", () => {
    console.log("Bot is online!")
    //
    var guidess = client.guilds.cache.size
    var userss = client.users.cache.size.toLocaleString()
    console.log(guidess)
    console.log(userss)
    module.exports = Object.freeze({
        guidess: guidess,
        userss: userss
      });
      //

});
client.on("guildCreate", (guild) => {
    const clientId = client.user.id
    const guildId2 = guild.id;
    //const guildId2 = ;
    const rest = new REST({
        version: "9"
    }).setToken(config.token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId2),
                { body: commands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
})
//

client.on("interactionCreate", async (interaction, message) => {

    const clientId3 = client.user.id
    const guildId3 = interaction.guild.id;
    //const guildId2 = ;
    const rest = new REST({
        version: "9"
    }).setToken(config.token);
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
if(interaction.isCommand()) {
} else if (interaction.isSelectMenu()) {

//--// ABOUTBOT //--//
if(interaction.customId == "select-aboutbot") {
    const aboutbot = require("./commands/aboutbot.js")
        await interaction.values.forEach(async value => {
          if(value == 'aboutbot_staff_embed') {
            /*if(!interaction.member.roles.cache.some(r => r.id === `${staff_member_role_id}`) || !interaction.member.roles.cache.some(r => r.id === `${author_role_id}`))
            return interaction.reply({
                content: "You don't have a permissions !",
                ephemeral: true
            });*/
            //
            await interaction.reply({ ephemeral: true, embeds: [ aboutbot.embed ] })
            }
            if(value == 'aboutbot_classic_embed') {
                await interaction.update({ embeds: [ aboutbot.embed2 ]  })
            }
        });
    }
    //
if(interaction.customId == "select-profile") {
    const profile = require("./commands/profile.js")
      console.log(profile.embed)
        await interaction.values.forEach(async value => {
          if(value == 'profile_staff_embed') {
           /* if(!interaction.member.roles.cache.some(r => r.id === `603505971507101698`) || !interaction.member.roles.cache.some(r => r.id === `603505971507101698`))
            return interaction.reply({
                content: "You don't have a permissions !",
                ephemeral: true
            });*/
            //
            await interaction.reply({ ephemeral: true, embeds: [ profile.embed ] })
            }
            if(value == 'profile_classic_embed') {
                await interaction.update({ embeds: [ profile.embed2 ]  })
            }
        });
    }
//--//  //--//
    }
    
/////////////// REPORT USER 
//    const reportuser = require("./commands/reportuser.js")
//if(interaction.customId === "confirm_button"){
//    await interaction.reply({ embeds: [ reportuser.report_user_embed ], ephemeral: true, components: [ reportuser.report_link ] })
//  }
///
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        if (err) console.error(err)

        await interaction.reply({
            content: "Ann error occurred while executing that command.",
            ephemeral: true
        });
    }
});

client.login(config.token);
 