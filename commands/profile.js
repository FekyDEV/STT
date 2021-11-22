const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require("discord.js");
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
            .setDescription('Do you want to hide our interaction ?')
        ),   

    async execute(interaction) {
let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
       }
       let reqOptions = {
         url: 'http://95.156.227.203:7000/users/user_id/' + interaction.member.id,
         method: "GET",
         headers: headersList,
       }
       axios.request(reqOptions).catch((err) => {
        message.lineReplyNoMention("❌ Provide a valid user ID !")
         if(err) return;
       })
       .then(function (res) {
if(!res.data[0]) {
          //
          axios.post('http://95.156.227.203:7000/users/', {
            user_id: interaction.member.id,
            user_name: interaction.member.tag,
            bdg_early: true
          })    
          const profile_first_embed = new Discord.MessageEmbed()
          .setColor(bot_color)
          .setDescription("**I see you here for the first time !** \n - Your profile will be ready in a few seconds...")
          .setFooter(bot_name, bot_logo)
          .setTimestamp()
            //
            interaction.reply({
                embeds: [ profile_first_embed ],
                ephemeral: interaction.options.getBoolean('hide')
            })
          return;
      }
    //
if(res.data[0]) {
    const bdgs = [];
    if(res.data[0].bdg_h1 == true) {
       bdgs.push('<:stt_report_huner_1:896337630399189002>');
    }
    if(res.data[0].bdg_h2 == true) {
      bdgs.push('<:stt_report_huner_2:896337630680211456>');
    }
    if(res.data[0].bdg_h3 == true) {
      bdgs.push('<:stt_report_huner_3:896337630399172638>');
    }
    if(res.data[0].bdg_verify == true) {
      bdgs.push('<:stt_verified:896337630663409704>');
    }
    if(res.data[0].bdg_dev == true) {
      bdgs.push('<:stt_verified_dev:896337630499848263>');
    }
    if(res.data[0].bdg_early == true) {
      bdgs.push('<:stt_early_supporter:901398398828154880>');
    }
    //////////////////////////////////////////////////////////////
    const user_lvl = [];
    if(res.data[0].xp >= 0) {
      user_lvl.push('Try some commands for more XP :)');
    }
    if(res.data[0].xp >= 20) {
      user_lvl.shift();
      user_lvl.push('LVL 1 <:level1:902463706879905793>');
    }
    if(res.data[0].xp >= 40) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 2 <:level2:902463707181899787>');
    }
    if(res.data[0].xp >= 60) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 3 <:level3:902463707324481586>');
    }
    if(res.data[0].xp >= 80) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 4 <:level4:902463707102216213>');
    }
    if(res.data[0].xp >= 100) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 5 <:level5:902463707194482768>');
    }
    if(res.data[0].xp >= 120) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 6 <:level6:902463707211239444>');
    }
    if(res.data[0].xp >= 140) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 7 <:level7:902463707165122580>');
    }
    if(res.data[0].xp >= 160) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 8 <:level8:902463707152531487>');
    }
    if(res.data[0].xp >= 180) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 9 <:level9:902463707114786857>');
    }
    if(res.data[0].xp >= 192) {
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('LVL 10 <:level10:902463707181899786>');
    }
    
    if(res.data[0].xp >= 200) {
      axios({
        method: 'patch',
        url: 'http://95.156.227.203:7000/users/user_id/' + interaction.member.id,
        data: [    
                { "propName": "xp", "value": 200 }
              ] 
      })
    
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.shift();
      user_lvl.push('Nice! You have reached the maximum level :tada: ');
    }
    //////////////////////
    let headersList2 = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
       }
       let reqOptions2 = {
         url: 'http://95.156.227.203:7000/users/user_id/' + interaction.member.id,
         method: "GET",
         headers: headersList2,
       }
       axios.request(reqOptions2).catch((err) => {
        message.lineReplyNoMention("❌ Provide a valid user ID !")
         if(err) return;
       })
       .then(function (res2) {    

        var embed2 = new Discord.MessageEmbed()
     .setColor(bot_color)
    .setTitle("<:stt_shop:896337630378205196> Your STT Profile") 
     //.setAuthor(interaction.member.tag, interaction.member.displayAvatarURL( { dynamic:true }))
     .setDescription("<:stt_beta:899703562316181526> __Testing Version (BETA)__")
     .addField("<:stt_ticket:894863362503110678> Username", "> " + res.data[0].user_name, true)
     .addField("<:stt_id:903032294590255106> User ID", "||" + res.data[0].user_id + "||", true)
     .addField("Badges - From STT", "> " + bdgs, false)
     .addField("Level", "> " + user_lvl, true)
     .addField("XP", "> " +  "`" + res2.data[0].xp + "`**/**200", true)
     .addField("Boost", "> " + "x" + res.data[0].boost, true)
     .addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Use commands and our features for more XP and Levels__ ! \n<:stt_rules:896337630550167562> **TIP:** __Report users and earn badges!__")
     .setFooter(bot_name, bot_logo)
     .setImage('https://i.imgur.com/TlNvTNW.png')
     .setTimestamp()
    //
    var embed = new Discord.MessageEmbed()
      .setColor(bot_color)
      .setTitle("<:stt_shop:896337630378205196> Your STT Admin Profile")
      .addField("<:stt_ticket:894863362503110678> Username", res.data[0].user_name, true)
      .addField("<:stt_id:903032294590255106> User ID", res.data[0].user_id, true)
    //
    const menu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select-profile')
            .setPlaceholder('Select a page')
            .addOptions([
                {
                    label: 'Classic Page', // NAZOV
                    description: 'Profile page for everyone.', // POPIS
                    value: 'profile_classic_embed', // HODNOTA
                },
                {
                    label: 'Admin Page',
                    description: 'Profile page for BOT Staffs',
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
       
    }})
    }}
