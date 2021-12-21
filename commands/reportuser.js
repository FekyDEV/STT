const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents, Collection, Discord, MessageActionRow, MessageButton, WebhookClient, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
//
const config = require("../Data/config.json");
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const axios = require("axios")
const moment = require('moment');

const report = require('../db/report_schema.js');
const user_profile = require('../db/user_schema.js');
const { getPriority } = require("os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reportuser")
        .setDescription("Report a User.")
        .addStringOption(option => option
            .setName('userid')
            .setDescription('Write a User ID (No Mention !)')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('message')
            .setDescription('Reason for the report (Only English)')
            .setRequired(true)          
        )
        .addStringOption(option => option
            .setName('proof')
            .setDescription('Fullscreen Screenshot (Link - https:// ...)')
            .setRequired(true)            
        ),  

    async execute(int) {
    
        getUser(int.user) // CHECKING IF USER'S PROFILE IS CREATED...

        const data = await getReport(int.options.getString('userid'))
        const user_data = await getUser(int.user)
        console.log("User data: %s", user_data.have_report)

        if(user_data.have_report == true) {
            int.reply({content:'You already have Pending Report !'})
                return;
        }

       if(!data) {
            console.log("No data..")
            createReport(int.options.getString('userid'))

            const confirm_embed = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(int.user.tag, int.user.displayAvatarURL( { dynamic: true }))
        .setTitle("WARNING !")
        .setTimestamp()
        .setFooter("<t:123>", bot_logo)
        .setDescription('> You confirm that the information and proof you submitted is correct and not edited in any way. \n \n > You confirm that the images you submitted are fullscreen images \n \n __Breaking this will lead to a permanent blacklist.__ ')
        //
        const confirm_button = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setCustomId('confirm_button')
				.setLabel('Confirm') // OBSAH SPRAVY
				.setStyle('SUCCESS'), // TYP TLACITKA
                //
            new MessageButton()
                .setCustomId('rozdelovaci_button')
				.setLabel('/') // OBSAH SPRAVY
				.setStyle('SECONDARY') // TYP TLACITKA
                .setDisabled(true),
                //
            new MessageButton()
                .setCustomId('cancel_button')
				.setLabel('Cancel') // OBSAH SPRAVY
				.setStyle('DANGER'), // TYP TLACITKA
                //
          );
          int.reply({
            embeds: [ confirm_embed ],
            components: [confirm_button],
            ephemeral: true
        })

       } else {
        console.log("Data: %s", data)
        console.log("Satus: %s", data.status)
          if(data.status == "pending") {
            int.reply({content:'User is already Reported !'})
                return;
        } else if(data.status == "accepted") {
            int.reply({content:'User is already Blacklisted !'})
                return;
        }

    }
       
// FUNKCIE
    async function getReport(usr_id) {
        let doc = await report.findOne({ reportedUserID: { $eq: usr_id } });
        return doc;
    }

        async function createReport(usr) {
            let doc = await report.findOne({ reportedUserID: { $eq: usr } });
            if (!doc) {
                const random_id = report_makeid()
                const report_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm")

                await report.create({
                    status: "pending",
                    reportID: random_id,
                    userID: int.user.id,
                    reportedUserID: int.options.getString('userid'),
                    reportMessage: int.options.getString('message'),
                    reportProof: int.options.getString('proof'),
                    timeCreated: report_date
                });
            }
            return doc;
        }

    }
}

function report_makeid() {
    var text = "";
    var possible = "0123456789";
  
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }



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

client.on("interactionCreate", async (int) => {
    const user_data = await getUser(int.user)
    const report_data = await getReportedUser(int.user.id)
    console.log("0")
let headersList1 = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.io)",
    "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
   }
   let reqOptions1 = {
    url: "https://discord.com/api/users/" + report_data.reportedUserID,
     method: "GET",
     headers: headersList1,
   }
   axios.request(reqOptions1).catch((err) => {
    int.reply("❌ Provide a valid user ID !")
    if(err) return;
  })
   .then(function (user_discord) {
  // VERFIY CHECK
    let is_verified = false
    if(user_data.bdg_verify == true) {
        is_verified = "<:stt_verified:896337630663409704>"
      }
// User //
    // CONFIRM
    if(int.customId === "confirm_button"){
        console.log("1")
        const report_log_embed = new MessageEmbed()
              .setColor(`RED`)
                .setTitle("NEW Report ! | ID: " + report_data.reportID)
                .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${int.user.tag} ${is_verified}⠀⠀⠀⠀⠀||${int.user.id}||`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + user_discord.data.id + "/" + user_discord.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
                //.addField("<:stt_ticket:894863362503110678> User Name", `${report_data.user}`,true)
                //.addField("<:stt_id:903032294590255106> User ID", `||${report_data.userID} ||`,true)
                .addField("<:stt_ticket:894863362503110678> Reported User Name", `${report_data.reportedUser}`,true)
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

    } else if(int.customId === "cancel_button"){

    }
// Staff
    if(int.customId === "report_accept"){

    } else if(int.customId === "report_deny"){

    } 
   }) // END (DISCORD API)
})

