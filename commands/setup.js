const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');
//
const config = require("../Data/config.json");
//
const axios = require("axios")
const moment = require('moment');
//
const ip = '5.249.164.143'
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
/////
module.exports = {
    data: new SlashCommandBuilder()
    
        .setName("setup")
        .setDescription("Display Setup Page.")
        .addSubcommand(subcommand =>
          subcommand
            .setName('info')
            .setDescription('Shows Setup Log Page.')
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('log')
            .setDescription('Setup Log Channel.')
            .addChannelOption(option => option.setName('log_channel').setRequired(true).setDescription('Select a Log Channel')))
        .addSubcommand(subcommand =>
          subcommand
            .setName('autoban')
            .setDescription('Setup Auto Ban for Blacklisted users.')
            .addBooleanOption(option => option.setName('autoban_opt').setRequired(false).setDescription('Enable or Disable this function ?'))
            )
        .addSubcommand(subcommand =>
          subcommand
            .setName('autorole')
            .setDescription('Setup Auto Role for Blacklisted users.')
            .addBooleanOption(option => option.setName('enable').setRequired(true).setDescription('Enable or Disable this function ?'))
            .addRoleOption(option => option.setName('role').setRequired(false).setDescription('Select a Role for Blacklisted users.')))            
          //
        .addSubcommand(subcommand =>
          subcommand
            .setName('alt')
            .setDescription('Setup ALT Detection.')
            .addBooleanOption(option => option.setName('enable').setRequired(true).setDescription('Enable or Disable this function ?'))
            .addIntegerOption(option => option.setName('alt_days').setRequired(false).setDescription('Select a days (0-365)'))),   

    async execute(interaction) {
      if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: "You do not have the following permissions:\n\`MANAGE_SERVER\`", ephemeral: true });

    
//-//--//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//
if(interaction.options.getSubcommand() === 'info') {
  axios.get('http://' + ip + ':5000/servers/sid/' + interaction.guild.id)
  .then((res) => { 

    let log_status = (res.data[0].log_status == true) ? `> __Status:__  <:Yes:871419569426804796> | <#${res.data[0].log_channel}>`:'> __Status:__  <:No:871419569472933918>'
    let autorole_status = (res.data[0].autorole == true) ? `> __Status:__  <:Yes:871419569426804796> | <@&${res.data[0].autorole_role}>`:'> __Status:__  <:No:871419569472933918>'
    let autoban_status = (res.data[0].autoban == true) ? `> __Status:__  <:Yes:871419569426804796>`:'> __Status:__  <:No:871419569472933918>'
    let urlblocker_status = (res.data[0].url_remover == true) ? `> __Status:__  <:Yes:871419569426804796>`:'> __Status:__  <:No:871419569472933918>'
    let alt_status = (res.data[0].alt_detection == true) ? `> __Status:__  <:Yes:871419569426804796> | ${res.data[0].alt_days} (days)`:'> __Status:__  <:No:871419569472933918>'
    //
  const embed = new MessageEmbed()
  .setAuthor(`${interaction.user.tag}` , interaction.user.displayAvatarURL({ dynamic: true }))
  .setColor(`${bot_color}`)
  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
  .setTitle(`<:stt_settings:896337630462115871>  ${interaction.guild.name}'s SETUP`)
  .setDescription('`Setup page for server owner.` \n\n <:Yes:871419569426804796> - Enabled \n <:No:871419569472933918> - Disabled \n \u200B \n<:stt_premium:894863362251427881> **Premium:** SOON \n\u200B')
  .addField(`Log Channel [ Use /setup log ... ]`, log_status, false)
  .addField(`Autorole [ Use /setup autorole ... ]`, autorole_status , false)
  .addField(`Autoban [ Use /setup autoban ... ]`, autoban_status, false)
  .addField(`URL Blocker <:stt_soon:899704071508877313> [ Use /setup url ... ]` , urlblocker_status, false)
  .addField(`ALT Detection [ Use /setup alt ... ]`, alt_status, false)
  .setFooter(`${interaction.guild.id} | ${interaction.guild.name}`, `${bot_logo}` )
  .setImage('https://i.imgur.com/TlNvTNW.png')
  .setTimestamp()
  //
      interaction.reply({
          embeds: [ embed ],
          ephemeral: false
      })
    })
}
//-//--//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//-//--//
axios.get('http://' + ip + ':5000/servers/sid/' + interaction.guild.id)
  .then((res_server) => { 
  if(interaction.options.getSubcommand() === 'log') {
    const log_chnl = interaction.options.getChannel('log_channel')
    if(log_chnl.type !== 'GUILD_TEXT') return interaction.reply({ content: 'You have to choose **Text Channel** !', ephemeral: true })

    console.log("NEW ACTIVITY: LOG SUBCOMMAND !")
    //console.log(log_chnl.type)
    //console.log(log_chnl.id)
    axios({
      method: 'patch',
      url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
      data: [    
       { "propName": "log_status", "value": true },
       { "propName": "log_channel", "value": log_chnl.id }]})
       //
       
   interaction.reply({ content: 'LOG was successfully **Enabled** !', ephemeral: true })
  //
  axios.get('http://' + ip + ':5000/servers/sid/' + interaction.guild.id)
     .then((res_srv1) => { 
      console.log(log_chnl.id)

  /*client.channels.fetch(log_chnl.id)
  .then(channel => channel.send({ content: ':white_check_mark: The log channel has been successfully set up here!'}).catch(console.error))
  .catch(console.error);*/
  return;
     })
    }
////-------////
    if(interaction.options.getSubcommand() === 'autoban') {  
      if(res_server.data[0].log_status == false) return interaction.reply({ content: 'You need to setup **log channel** first !', ephemeral: true})
      if(res_server.data[0].autorole == true) return interaction.reply({ content: 'You need to disable auto-role first!', ephemeral: true})
      if(interaction.options.getBoolean('autoban_opt') == true) {
      console.log("NEW ACTIVITY: AUTOBAN SUBCOMMAND !")
      axios({
        method: 'patch',
        url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
        data: [    
          { "propName": "autoban", "value": true }
        ]})
         //
         
     interaction.reply({ content: ':white_check_mark: Autoban has been successfully **Enabled** !', ephemeral: true })
    //
    return;
  } else {
    console.log("NEW ACTIVITY: AUTOBAN SUBCOMMAND !")
    axios({
      method: 'patch',
      url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
      data: [    
        { "propName": "autoban", "value": false }
      ]})
       //
   interaction.reply({ content: 'Autoban has been successfully **Disabled** !', ephemeral: true })
  //
  return;
  }
      }
////-------////
if(interaction.options.getSubcommand() === 'autorole') { 
  if(res_server.data[0].log_status == false) return interaction.reply({ content: 'You need to setup **log channel** first !', ephemeral: true})
  if(res_server.data[0].autoban == true) return interaction.reply({ content: 'You need to disable auto-ban first!', ephemeral: true})
  if(interaction.options.getBoolean('enable') == true) {
  if(interaction.options.getRole('role')) {
    const rola = interaction.options.getRole('role')
      if(rola.permissions.toArray().includes('ADMINISTRATOR')) return interaction.reply({ content: 'This role have **ADMINISTRATOR** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_GUILD')) return interaction.reply({ content: 'This role have **MANAGE_GUILD** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_MESSAGES')) return interaction.reply({ content: 'This role have **MANAGE_MESSAGES** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('BAN_MEMBERS')) return interaction.reply({ content: 'This role have **BAN_MEMBERS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('KICK_MEMBERS')) return interaction.reply({ content: 'This role have **KICK_MEMBERS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_CHANNELS')) return interaction.reply({ content: 'This role have **MANAGE_CHANNELS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_ROLES')) return interaction.reply({ content: 'This role have **MANAGE_ROLES** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_NICKNAMES')) return interaction.reply({ content: 'This role have **MANAGE_NICKNAMES** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_WEBHOOKS')) return interaction.reply({ content: 'This role have **MANAGE_WEBHOOKS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MANAGE_THREADS')) return interaction.reply({ content: 'This role have **MANAGE_THREADS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('VIEW_GUILD_INSIGHTS')) return interaction.reply({ content: 'This role have **VIEW_GUILD_INSIGHTS** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('VIEW_AUDIT_LOG')) return interaction.reply({ content: 'This role have **VIEW_AUDIT_LOG** permissions !', ephemeral: true })
      if(rola.permissions.toArray().includes('MENTION_EVERYONE')) return interaction.reply({ content: 'This role have **MENTION_EVERYONE** permissions !', ephemeral: true })
    //
    //console.log(rola.permissions.toArray())
  console.log("NEW ACTIVITY: AUTOROLE SUBCOMMAND !")
  axios({
    method: 'patch',
    url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
    data: [    
      { "propName": "autorole", "value": true },
      { "propName": "autorole_role", "value": rola.id }]
    })
     //

 interaction.reply({ content: ':white_check_mark: Autorole has been successfully **Enabled** !', ephemeral: true })
//
return;

  } 
  } else {
  console.log("NEW ACTIVITY: AUTOROLE SUBCOMMAND !")
  axios({
    method: 'patch',
    url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
    data: [    
      { "propName": "autorole", "value": false },
      { "propName": "autorole_role", "value": "none" }]
    })
     //
     
 interaction.reply({ content: 'Autorole has been successfully **Disabled** !', ephemeral: true })
//
  }
}
/////////////////////////////////
  if(interaction.options.getSubcommand() === 'alt') {  
    if(res_server.data[0].log_status == false) return interaction.reply({ content: 'You need to setup **log channel** first !', ephemeral: true})
    if(interaction.options.getBoolean('enable') == true) {
    if(interaction.options.getInteger('alt_days') <= 365) {
      const dni = interaction.options.getInteger('alt_days')
      console.log(dni)
    console.log("NEW ACTIVITY: ALT DETECTION SUBCOMMAND !")
    axios({
      method: 'patch',
      url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
      data: [    
       { "propName": "alt_detection", "value": true },
       { "propName": "alt_days", "value": dni }]})
       //
       
   interaction.reply({ content: ':white_check_mark: Alt Detection has been successfully **Enabled** !', ephemeral: true })
  //
  return;
} else {
  interaction.reply({ content: 'max **365** days !', ephemeral: true })
}
  } else {
    console.log("NEW ACTIVITY: ALT DETECTION SUBCOMMAND !")
    axios({
      method: 'patch',
      url: 'http://' + ip + ':5000/servers/sid/' + interaction.guild.id,
      data: [    
       { "propName": "alt_detection", "value": false },
       { "propName": "alt_days", "value": 0 }]})
       //
       
   interaction.reply({ content: 'Autoban has been successfully **Disabled** !', ephemeral: true })
  //
  return;
  }
}
  })
}
    
  }

