const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
//
const ip = '5.249.164.143'
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
//
const axios = require('axios');

//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Display your STT Profile.")
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ? + Your Report Stats !')
        ),
           

    async execute(interaction) {
let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
       }
       let reqOptions = {
         url: 'http://' + ip + ':7000/users/id/' + interaction.user.id,
         method: "GET",
         headers: headersList,
       }
       axios.request(reqOptions).catch((err) => {
        console.log("❌ Provide a valid user ID !")
         if(err) return;
       })
       .then(function (res) {
if(!res.data[0]) {
          //
          axios.post('http://' + ip + ':7000/users/', {
            id: interaction.user.id,
            username: interaction.user.tag,
            bdg_early: true
          })   
          console.log("Sended !")
          // 
          const profile_first_embed = new MessageEmbed()
          .setColor(bot_color)
          .setDescription("**I see you here for the first time !** \n - Your profile will be ready in a few seconds...")
          .setFooter(bot_name, bot_logo)
          .setTimestamp()
            //
            interaction.reply({
                embeds: [ profile_first_embed ],
                ephemeral: true
            })
          return;
      }
    //
if(res.data[0]) {
//
let is_verified = ""
if(res.data[0].bdg_verify == true) {
  is_verified = '<:stt_verified:896337630663409704>  '
} 
//
let bdgs = ""
if(res.data[0].bdg_dev == true) {
  bdgs += '<:stt_verified_dev:896337630499848263>  '
} 
 if(res.data[0].bdg_early == true) {
  bdgs +=  '<:stt_early_supporter:901398398828154880>  '
} 
 if(res.data[0].bdg_h1 == true) {
  bdgs += '<:stt_report_huner_1:896337630399189002>  '
} 
 if(res.data[0].bdg_h2 == true) {
  bdgs += '<:stt_report_huner_2:896337630680211456>  '
} 
 if(res.data[0].bdg_h3 == true) {
  bdgs += '<:stt_report_huner_3:896337630399172638>  '
} 

//////////////////////////////////////////////////////////////
 let user_lvl = ""
 if(res.data[0].xp >= 0) {
  user_lvl = 'Try some commands for more XP :)'
} 
 if(res.data[0].xp >= 20) {
  user_lvl = 'LVL 1 <:level1:902463706879905793>'
} 
 if(res.data[0].xp >= 40) {
  user_lvl = 'LVL 2 <:level2:902463707181899787>'
} 
 if(res.data[0].xp >= 60) {
  user_lvl = 'LVL 3 <:level3:902463707324481586>'
} 
 if(res.data[0].xp >= 80) {
  user_lvl = 'LVL 4 <:level4:902463707102216213>'
} 
 if(res.data[0].xp >= 100) {
  user_lvl = 'LVL 5 <:level5:902463707194482768>'
} 
 if(res.data[0].xp >= 120) {
  user_lvl = 'LVL 6 <:level6:902463707211239444>'
} 
 if(res.data[0].xp >= 140) {
  user_lvl = 'LVL 7 <:level7:902463707165122580>'
} 
 if(res.data[0].xp >= 160) {
  user_lvl = 'LVL 8 <:level8:902463707152531487>'
} 
 if(res.data[0].xp >= 180) {
  user_lvl = 'LVL 9 <:level9:902463707114786857>'
} 
 if(res.data[0].xp >= 199) {
  user_lvl = 'LVL 10 <:level10:902463707181899786>'
} 
 if(res.data[0].xp >= 200) {
  user_lvl = 'Nice! You have reached the maximum level :tada: '
} 
//////////////////////////////////////////
let bl_status = ""
//
axios.get('http://' + ip + ':4000/reports/id/' + interaction.user.id)
.catch((err) => {
    console.log('something is wrong')
 }).then((res_bl) => {
//
if(!res_bl.data[0]) {
  bl_status += "<:stt_not_blacklisted:894982664820506644>"
} else {
  if(res_bl.data[0].status == "accepted") {
    bl_status = "<:stt_blacklisted:894982664447209554>"
  } 
}

  
//////////////////////////////////////////

    let headersList2 = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
       }
       let reqOptions2 = {
         url: 'http://' + ip + ':7000/users/id/' + interaction.user.id,
         method: "GET",
         headers: headersList2,
       }
       axios.request(reqOptions2).catch((err) => {
        console.log("❌ Provide a valid user ID !")
         if(err) return;
       })
       .then(function (res2) {    
         console.log(res2)
  var embed2 = new MessageEmbed()
     .setColor(bot_color)
     .setTitle("<:stt_shop:896337630378205196> Your STT Profile") 
     .setDescription("<:stt_beta:899703562316181526> __Testing Version (BETA)__")
     .addField("<:stt_ticket:894863362503110678> Username", "> " + bl_status + "  " + res.data[0].username + "  " + is_verified, true)
     .addField("<:stt_id:903032294590255106> User ID", "||" + res.data[0].id + "||", true)
     .addField("Badges - From STT", "> " + bdgs, false)
     .addField("Level", "> " + user_lvl, true)
     .addField("XP", "> " +  "`" + res2.data[0].xp + "`**/**200", true)
     .addField("Boost", "> " + "x" + res.data[0].boost, true)
     .setFooter(bot_name, bot_logo)
     .setImage('https://i.imgur.com/TlNvTNW.png')
     .setTimestamp()
    //
    if(interaction.options.getBoolean('hide') == true) {
      let pending_reports = res2.data[0].user_total_reports - (res2.data[0].user_approved_reports + res2.data[0].user_denied_reports)
      embed2.addField("<:stt_shop:896337630378205196> Reports", "All: " + res2.data[0].user_approved_reports, true)
      embed2.addField("<:stt_pending:905529168953999371> Pending Reports", "Pending: " + pending_reports, true)
    }
    embed2.addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Use commands and our features for more XP and Levels__ ! \n<:stt_rules:896337630550167562> **TIP:** __Report users and earn badges!__ \n<:stt_rules:896337630550167562> **TIP:** __Try hidden profile for report stats !__")

    //
    //
    var embed = new MessageEmbed()
      .setColor(bot_color)
      .setTitle("<:stt_shop:896337630378205196> Your STT Admin Profile")
      .addField("<:stt_ticket:894863362503110678> Username", res.data[0].username, true)
      .addField("<:stt_id:903032294590255106> User ID", "||" + res.data[0].id + "||", true)
      .addField("<:stt_shop:896337630378205196> Total Reports", "Total: " + res.data[0].admin_total_reports, false)
      .addField("<:stt_accepted:905529657217146950> Approved Reports", "Approved: " + res2.data[0].admin_approved_reports, true)
      .addField("<:stt_denied:906514271217811467> Denied Reports", "Denied: " + res2.data[0].admin_denied_reports, true)

    //
    const menu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select-profile')
            .setPlaceholder('Select a page')
            .addOptions([
                {
                    label: 'Classic Page [Current Page]', 
                    emoji: '894987766012706877',
                    description: 'Profile page for everyone.', 
                    value: 'profile_classic_embed', 
                    default: true, 
                },
                {
                    label: 'Admin Page',
                    emoji: '894863362658283550',
                    description: 'Profile page for BOT Staff.',
                    value: 'profile_staff_embed',
                },
            ]),
    );
    module.exports = Object.freeze({
        embed: embed,
        embed2: embed2
      });
    interaction.reply({
        embeds: [ embed2 ],
        components: [ menu ],
        ephemeral: interaction.options.getBoolean('hide')
      })
    })
  })
    }})
    }}
