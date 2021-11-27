/** @format */

//
//const Discord = require("discord.js");
const config = require("./Data/config.json");
//
const ip = '5.249.164.143'
//
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
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_MEMBERS 
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
    console.log(interaction.customId)

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

//--// ABOUTBOT //--//´
axios.get('http://' + ip + ':7000/users/id/' + interaction.user.id)
             .then((res) => { 
if(interaction.customId == "select-aboutbot") {
    const aboutbot = require("./commands/aboutbot.js")//
         interaction.values.forEach(async value => {
            //
            if(value == 'aboutbot_classic_embed') return console.log("Nothing to do..-")
            
                if(value == 'aboutbot_staff_embed') {
                    if(res.data[0].is_admin == true) {
                        interaction.reply({ ephemeral: true, embeds: [ aboutbot.embed ] })
                    }
                } else {
                    return interaction.reply({
                        content: "You don't have a permissions !",
                        ephemeral: true
                    });
                }
            
        });
    }
//////////////////////////////////////////////////////////////////////////////////////////////////// PROFILE - SELECT MENU
if(interaction.customId == "select-profile") {
    const profile = require("./commands/profile.js")
         interaction.values.forEach(async value => {
          if(value == 'profile_staff_embed') {
            if(value == 'aboutbot_staff_embed') {
            
            if(res.data[0].is_admin == true) {
                interaction.reply({ ephemeral: true, embeds: [ profile.embed ] })
            }
               
            } else {
                return interaction.reply({
                    content: "You don't have a permissions !",
                    ephemeral: true
                });
            }
        }
            if(value == 'profile_classic_embed') {
                 interaction.update({ embeds: [ profile.embed2 ]  })
            }
            

        });
    }
//////////////////////////////////////////////////////////////////////////////////////////////////// BAN APPEAL - BUTTONS
    /*if(interaction.customId == "confirm_butn"){
        console.log("Ban Appeal sended 1 !")
    }
    if(interaction.customId === "confirm_butn"){
        console.log("Ban Appeal sended 2 !")
    }
    //
    if(interaction.customId == 'confirm_butn'){
        console.log("Ban Appeal sended 3 !")
    }
    if(interaction.customId === 'confirm_butn'){
        console.log("Ban Appeal sended 4 !")
    }


    if(interaction.customId == "3"){
        console.log("Ban Appeal denied !")
    }*/
////////////////////////////////////////////////////////////////////////////////////////////////////
})
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
 