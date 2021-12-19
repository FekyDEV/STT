const fs = require('fs');
const { REST } = require('@discordjs/rest'); // OVERENE
const { Routes } = require('discord-api-types/v9'); // OVERENE
const { Discord, Client, Intents, Collection, MessageSelectMenu,MessageActionRow } = require("discord.js");
const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_MEMBERS 
		]
	});
const config = require("./Data/config.json");

// MONGODB LOAD (From Sloth)
async function loadDB() {
	const mongoose = require('mongoose');
	await mongoose.connect("mongodb://localhost/stt", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() =>{
		console.log('Connected to the database...');
	}).catch((err) => {
		console.log(err);
	});
}

loadDB();
// END (MONGODB)

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
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

client.on("ready", () => {
    console.log("Bot is online!")
    //
    var guidess = client.guilds.cache.size
    var userss = client.users.cache.size.toLocaleString()
    module.exports = Object.freeze({
        guidess: guidess,
        userss: userss
      });
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
 if (interaction.isSelectMenu()) {

//--// ABOUTBOT //--//´
const data = await getUser(interaction.user.id);

if(interaction.customId == "select-aboutbot") {
    const aboutbot = require("./commands/aboutbot.js")//
         interaction.values.forEach(async value => {
            //
            if(value == 'aboutbot_classic_embed') return console.log("Nothing to do..-")
                if(value == 'aboutbot_staff_embed') {
                    if(!data || data.is_admin !== true) {
                        return interaction.reply({
                        content: "You don't have a permissions !",
                        ephemeral: true
                    });
                } else if(data.is_admin == true) {
                    interaction.reply({ ephemeral: true, embeds: [ aboutbot.embed ] })
                }
            }
        });
    }

if(interaction.customId == "select-profile") {
    const profile = require("./commands/profile.js")
         interaction.values.forEach(async value => {
          if(value == 'profile_staff_embed') {
            if(!data || data.is_admin !== true) {
                return interaction.reply({
                    content: "You don't have a permissions !",
                    ephemeral: true
                });
            } else if(data.is_admin == true) {
                interaction.reply({ ephemeral: true, embeds: [ profile.embed ] })   
            } 
        }
            if(value == 'profile_classic_embed') {
                 interaction.update({ embeds: [ profile.embed2 ]  })
            }

        });
    }
}
    
// OTHER STUFF
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

const user_profile = require("./db/user_schema.js")
async function getUser(usr) {
    let doc = await user_profile.findOne({ user_id: { $eq: usr.id } });
    if (!doc) {
        console.log("Nevermind...")
    }
    user_profile.usr = doc;
    return doc;
}

client.login(config.token);
 