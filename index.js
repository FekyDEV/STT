const fs = require('fs');
const { REST } = require('@discordjs/rest'); // OVERENE
const { Routes } = require('discord-api-types/v9'); // OVERENE
const { Discord, Client, Intents, Collection, MessageSelectMenu,MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");
const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_MEMBERS 
		]
	});
const config = require("./Data/config.json");
const axios = require('axios')
const moment = require('moment');

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

client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) return;
    if(interaction.isSelectMenu()) return;
    //if(interaction.customId !== "confirm_button" || interaction.customId !== "cancel_button" || interaction.customId !== "report_accept" || interaction.customId !== "report_deny") return;

    async function getUser(usr) {
        let doc = await user_profile.findOne({ user_id: { $eq: usr.id } });
        if (!doc) {
            doc = await user_profile.create({
                user_id: usr.id,
                bdg_early: true,
            });
            console.log("Creating new user...")
        }
        return doc;
    }

    async function getReportedUser(usr) {
        let doc = await report.findOne({ userID: { $eq: usr } });
        return doc;
    }

    const report = require('./db/report_schema.js');
        const user_profile = require('./db/user_schema.js');
        const user_data = await getUser(interaction.user)
        const report_data = await getReportedUser(interaction.user.id)

    let headersList1 = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Authorization": "Bot OTA0MDk0ODQzNTAzMDEzOTQ4.YX2h7w.neJLknzp0IdkqF6YodVca5OvbL8" 
   }
   let reqOptions1 = {
    url: "https://discord.com/api/users/" + report_data.reportedUserID,
     method: "GET",
     headers: headersList1,
   }
   axios.request(reqOptions1).catch((err) => {
    interaction.reply("❌ Provide a valid user ID !")
    if(err) return;
  })
   .then(function (user_discord) {
    let headersList2 = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot OTA0MDk0ODQzNTAzMDEzOTQ4.YX2h7w.neJLknzp0IdkqF6YodVca5OvbL8" 
       }
       let reqOptions2 = {
        url: "https://discord.com/api/users/" + interaction.user.id,
         method: "GET",
         headers: headersList2,
       }
       axios.request(reqOptions2).catch((err) => {
        interaction.reply("❌ Provide a valid user ID !")
        if(err) return;
      })
       .then(function (user_discord2) {

        async function deleteReport(usr) {
        const doc4delete = await getReportedUser(usr);
        doc4delete.deleteOne();
    }
// User //
    // CONFIRM
    if(interaction.customId === "confirm_button"){
  // VERFIY CHECK
    let is_verified = ""
    if(user_data.bdg_verify == true) {
        is_verified = "<:stt_verified:896337630663409704>"
      }

      const report_user_embed = new MessageEmbed()
      .setColor(`GREEN`)
      .setDescription("<:stt_check:894982664820506644>  __Your Report has been sended successfully__ !")
      .setThumbnail("https://cdn.discordapp.com/avatars/" + user_discord.data.id + "/" + user_discord.data.avatar + ".png")
      .setImage('https://i.imgur.com/TlNvTNW.png')
      .addField("<:stt_ticket:894863362503110678> User Name", `${user_discord.data.username}#${user_discord.data.discriminator}`,true)
      .addField("<:stt_id:903032294590255106> User ID", `||${report_data.reportedUserID} ||`,true)
      .addField("<:stt_shop:896337630378205196>  Report Message", `${report_data.reportMessage} \n \n > Now you have to wait for Staff respond !`)
      .setFooter(`Status: Pending`, 'https://cdn.discordapp.com/emojis/905529168953999371.png?size=96' )
      .setTimestamp()
    //
          if(report_data.reportProof.includes("https://")) {
      const report_link = new MessageActionRow()
      .addComponents(
          new MessageButton()
          .setURL(report_data.reportProof)
          .setLabel('Proof Link') // OBSAH SPRAVY
          .setStyle('LINK'), // TYP TLACITKA
          //
      );
      interaction.update({
          embeds: [ report_user_embed ],
          components: [report_link],
          ephemeral: true
      })


        const report_log_embed = new MessageEmbed()
              .setColor(`BLUE`)
                .setTitle("NEW Report ! | ID: " + report_data.reportID)
                .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${interaction.user.tag} ${is_verified}⠀⠀⠀⠀⠀||${interaction.user.id}||`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + user_discord.data.id + "/" + user_discord.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
        
                .addField("<:stt_ticket:894863362503110678> Reported User Name", `${user_discord.data.username + "#" + user_discord.data.discriminator}`, true)
                .addField("<:stt_id:903032294590255106> Reported User ID", `||${report_data.reportedUserID} ||`,true)
                .addField("<:stt_shop:896337630378205196>  Report Message", `${report_data.reportMessage} \n \n ${report_data.reportProof}`, false)
                .setFooter(`Date: ${report_data.timeCreated}`, 'https://cdn.discordapp.com/emojis/905529168953999371.png?size=96' )
                .setTimestamp()
            //
            const rozhodnutie_reporta = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('report_accept')
                    .setLabel('Accept') // OBSAH SPRAVY
                    .setStyle('SUCCESS'), // TYP TLACITKA
                    //
                    new MessageButton()
                    .setCustomId('nothiiing')
                    .setLabel('/') // OBSAH SPRAVY
                    .setDisabled(true)
                    .setStyle('SECONDARY'), // TYP TLACITKA
                    //
                    new MessageButton()
                    .setCustomId('report_deny')
                    .setLabel('Deny') // OBSAH SPRAVY
                    .setStyle('DANGER'), // TYP TLACITKA
                    //
                );

                client.channels.fetch('913364277522468866')
                .then(channel => channel.send({ content: report_data.reportID, embeds: [ report_log_embed ], components: [ rozhodnutie_reporta ]}).catch(console.error))
                .catch(console.error);
            } else {
                interaction.update({content:'> The proof must be a link (https://) !', components: [], embeds: []})
                     deleteReport(interaction.user.id)
            }
            

            // Pridanie: all_reports = + 1, have_reports -> true | pre Usera

             editUser(interaction.user, 0,(user_data.all_reports + 1)); // ADD COUNT OF ALL REPORTS FOR USER
             editUser(interaction.user, 1, true); // ADD USER REPORT STATUS TO true

            async function getUserforEdit(usr) {
                let doc = await user_profile.findOne({ user_id: { $eq: usr.id } });
                usr.user_profile = doc;
                return doc;
            }

            async function editUser(usr, tochange, newData) {
                const doc = await getUserforEdit(usr);
                switch (tochange) {
                    case 0: { // all_reports
                        await doc.updateOne({ all_reports: newData });
                        usr.user_profile.all_reports = newData;
                    }
                        break;
                    case 1: { // have_reports
                        await doc.updateOne({ have_report: newData });
                        usr.user_profile.have_report = newData;
                    }
                        break;
                    case 2: { // accepted_reports
                        await doc.updateOne({ accepted_reports: newData });
                        usr.user_profile.accepted_reports = newData
                    }
                        break;
                    case 3: { // denied_reports
                        await doc.updateOne({ denied_reports: newData });
                        usr.user_profile.denied_reports = newData
                    }
                        break;
                    // FOR ADMIN
                        case 4: { // admin_all_reports
                            await doc.updateOne({ admin_all_reports: newData });
                            usr.user_profile.admin_all_reports = newData
                        }
                            break;
                            case 5: { // admin_accepted_reports
                                await doc.updateOne({ admin_accepted_reports: newData });
                                usr.user_profile.admin_accepted_reports = newData
                            }
                                break;
                            case 6: { // admin_denied_reports
                                await doc.updateOne({ admin_denied_reports: newData });
                                usr.user_profile.admin_denied_reports = newData
                            }
                                break;
                    default:
                        throw new Error("Try it again...");
                }
                return true;
            }

    } else if(interaction.customId === "cancel_button"){

         deleteReport(interaction.user.id)

        const cancel_embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true }))
        .setTitle("Report was Canceled !")
        .setTimestamp()
        .setFooter("STT")
        //

        interaction.update({
            embeds: [ cancel_embed ],
            components: [ ],
            ephemeral: true
        })

        //getUser(interaction.user)
        
        
    }
// Staff
    if(interaction.customId === "report_accept"){
        const accepted_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm:ss");
        let is_verified = ""
        if(user_data.bdg_verify == true) {
            is_verified = "<:stt_verified:896337630663409704>"
          }

          async function getReportbyID(rid) {
            let doc = await report.findOne({ reportID: { $eq: rid } });
            return doc;
        }
            
        async function editReport(rid, tochange, newData) {
            const doc = await getReportbyID(interaction.message.content);
            const report2 = require('./db/report_schema.js');
            switch (tochange) {
                case 0: { // status
                    await doc.updateOne({ status: newData });
                    //rid.report2.status = newData;
                }
                    break;
                case 1: { // admin
                    await doc.updateOne({ admin: newData });
                    //rid.report2.admin = newData;
                }
                    break;
                case 2: { // adminComment
                    await doc.updateOne({ adminComment: newData });
                    //rid.report2.adminComment = newData
                }
                    break;
                case 3: { // timeChanged
                    await doc.updateOne({ timeChanged: newData });
                    //rid.report2.timeChanged = newData
                }
                    break;
                default:
                    throw new Error("Nope");
            }
            return true;
        }

        async function getUserforEdit2(usr) {
            let doc = await user_profile.findOne({ user_id: { $eq: usr.id } });
            usr.user_profile = doc;
            return doc;
        }

        async function editUser2(usr, tochange, newData) {
            const doc = await getUserforEdit2(usr);
            switch (tochange) {
                case 0: { // all_reports
                    await doc.updateOne({ all_reports: newData });
                    usr.user_profile.all_reports = newData;
                }
                    break;
                case 1: { // have_reports
                    await doc.updateOne({ have_report: newData });
                    usr.user_profile.have_report = newData;
                }
                    break;
                case 2: { // accepted_reports
                    await doc.updateOne({ accepted_reports: newData });
                    usr.user_profile.accepted_reports = newData
                }
                    break;
                case 3: { // denied_reports
                    await doc.updateOne({ denied_reports: newData });
                    usr.user_profile.denied_reports = newData
                }
                    break;
                // FOR ADMIN
                    case 4: { // admin_all_reports
                        await doc.updateOne({ admin_all_reports: newData });
                        usr.user_profile.admin_all_reports = newData
                    }
                        break;
                        case 5: { // admin_accepted_reports
                            await doc.updateOne({ admin_accepted_reports: newData });
                            usr.user_profile.admin_accepted_reports = newData
                        }
                            break;
                        case 6: { // admin_denied_reports
                            await doc.updateOne({ admin_denied_reports: newData });
                            usr.user_profile.admin_denied_reports = newData
                        }
                            break;
                default:
                    throw new Error("Try it again...");
            }
            return true;
        }

        
        // Upravenie: status -> accepted, admin -> interaction.user.tag, timeChanged -> accepted_date
         editReport(interaction.message.content, 0, "accepted"); // CHANGE REPORT STATUS 
         editReport(interaction.message.content, 1, interaction.user.tag); // BY ADMIN
         editReport(interaction.message.content, 2, "Thanks for your Report !"); // ADMIN COMMENT
         editReport(interaction.message.content, 3, accepted_date); // BY ADMIN

            // Upravenie: admin_approved_reports, admin_total_reports
            editUser2(interaction.user, 4, (user_data.admin_all_reports + 1)); // ADD COUNT OF ALL REPORTS FOR ADMIN
            editUser2(interaction.user, 5, (user_data.admin_accepted_reports + 1)); // ADD COUNT OF ACCEPTED REPORTS FOR ADMIN
           
            // Upravenie: have_report pre užívateľa na -> false, user_approved_reports +1
            const user_data2 = getUser(user_discord.data.id)
            editUser2(user_discord.data.id, 0, (user_data2.all_reports + 1)); // ADD COUNT OF ALL REPORTS FOR ADMIN
            editUser2(user_discord.data.id, 1, false); // ADD COUNT OF ACCEPTED REPORTS FOR ADMIN
            editUser2(user_discord.data.id, 2, (user_data2.accepted_reports + 1)); // ADD COUNT OF ACCEPTED REPORTS FOR ADMIN
           

            const report_accepted_log_embed = new MessageEmbed()
              .setColor(`GREEN`)
                .setTitle("Report | ID: " + report_data.reportID)
                .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${user_discord2.data.username}#${user_discord2.data.discriminator} ${is_verified}⠀⠀⠀⠀⠀||${user_discord2.data.id}||`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + user_discord.data.id + "/" + user_discord.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .addField("<:stt_ticket:894863362503110678> Reported User Name", `${report_data.reportedUser}`,true)
                .addField("<:stt_id:903032294590255106> Reported User ID", `||${report_data.reportedUserID} ||`,true)
                .addField("<:stt_shop:896337630378205196>  Report Message", `${report_data.reportMessage} \n \n ${report_data.reportProof}`, false)
                .setFooter(`Date: ${accepted_date}`, 'https://cdn.discordapp.com/emojis/905529657217146950.png?size=96' )
                .setTimestamp()
            //
            interaction.update({
              embeds: [  ],
              components: [ ],
              content: 'Success!',
          })
          //
          axios.post('https://canary.discord.com/api/webhooks/913364429230440449/0QRPGseKwCwDkt2WGcv0L4_KFpr9g3QBtQZ-xu98YmcjgZwqfHg5ZOBQwX1viuyJz4bO', {
            username: "STT | LOG",
            avatar_url: client.user.displayAvatarURL( { dynamic: true}),
	        embeds: [ report_accepted_log_embed ],
        })

    } else if(interaction.customId === "report_deny"){

    } 
}) // END (DISCORD API)
   }) // END (D. API #2)
})
/*
const user_profile = require("./db/user_schema.js")
async function getUser(usr) {
    let doc = await user_profile.findOne({ user_id: { $eq: usr.id } });
    if (!doc) {
        console.log("Nevermind...")
    }
    user_profile.usr = doc;
    return doc;
}*/

client.login(config.token);
 