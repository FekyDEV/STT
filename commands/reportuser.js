const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents, Collection, Discord, MessageActionRow, MessageButton, WebhookClient, MessageEmbed } = require('discord.js');
//
const config = require("../Data/config.json");
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const axios = require("axios")
const moment = require('moment');

const report = require('../db/report_schema.js');
const user_profile = require('../db/user_schema.js');

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

        //const data = await getReport(int.options.getString('userid'));
        

        getReport(int.user)

        async function getReport(usr) {
            let doc = await report.findOne({ reportedUserID: { $eq: usr.id } });
            if (!doc) {
                const random_id = report_makeid()
                const report_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm")

                await report.create({
                    status: "pending",
                    reportID: random_id,
                    reportedUserID: usr.id,
                    userID: int.options.getString('userid'),
                    reportMessage: int.options.getString('message'),
                    reportProof: int.options.getString('proof'),
                    timeCreated: report_date
                });
                console.log("Creating new user...")
            } else {
                if(doc.status == "pending") {
                    int.reply({content:'User is already Reported !'})
                }
                if(doc.statis == "accepted") {
                    int.reply({content:'User is already Blacklisted !'})
                }
                console.log("no no..")
            }
            usr.report = doc;
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
    usr.user_profile = doc;
    return doc;
}