const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
//
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("aboutbot")
        .setDescription("Show things about the BOT.")
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')  
        ),
        
    async execute(interaction) {
        const menu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select-aboutbot')
                .setPlaceholder('Select a page')
                .addOptions([
                    {
                        label: 'Classic Page', // NAZOV
                        description: 'About Bot for everyone.', // POPIS
                        value: 'aboutbot_classic_embed', // HODNOTA
                    },
                    {
                        label: 'Admin Page',
                        description: 'About Bot for BOT Staffs',
                        value: 'aboutbot_staff_embed',
                    },
                ]),
        );
        //
        const member = interaction.member
        const ping_ping = `${Date.now() - interaction.createdTimestamp}`
        const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        //
        const d = moment.duration(info.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()}d`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()}h`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()}m`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()}s`;
        const date = moment().subtract(d, 'ms').format('01/07/2021');
        //
        const ping = []
        if(ping_ping <= 80) {
            ping.push("<:stt_connection_best:896337630608908308>")
          }
          if(ping_ping >= 80) {
            ping.shift();
            ping.push("<:stt_connection_good:896337630525009981>")
          }
          if(ping_ping >= 125) {
            ping.shift();
            ping.shift();
            ping.push("<:stt_connection_bad:896337630520836136>")
          }

      const index = require("../")

      var embed2 = new Discord.MessageEmbed()
      .setColor(bot_color)
        .setAuthor('ABOUT THE BOT', 'https://cdn.discordapp.com/emojis/894863362779906068.png?size=96')
        .addField(`<:stt_ticket:894863362503110678> Name:`, '`' +  `Stop The Trollers` + '`', true)
        .addField('<:stt_guide:896337630587936798> Servers:', `${index.guidess}`, true) 
        .addField(`<:stt_commands:894988369795354656> Prefix`, '`' + `/ - Slash commands` + '`', false) 
        .addField(`${ping} Ping`, '`' + `${Date.now() - interaction.createdTimestamp}ms` + '`', false)
        .addField(`<:stt_rules:896337630550167562> Library:`, '`' + `discord.js` +` (v${djsversion}` + ')' + '`', false)
        .addField('UPTIME:',`\`\`\`prolog\n${days} ${hours} ${minutes} ${seconds}\`\`\``)
        .addField('CREATED AT:', '`' + `${moment(interaction.createdTimestamp).format('MMMM Do YYYY')}` + '`' + ' **|** ' + '`' + `${Math.floor((Date.now() - interaction.createdTimestamp) / 86400000)}` + '`' + ' **day(s) ago**')
        .addField('<:stt_integration:896337630747312168> BOT INVITE LINK:', "[INVITE HERE](https://bit.ly/stopthetrollersbotinv)", true)
        .addField('<:stt_link:894863362595373076> SUPPORT DISCORD:', "[JOIN HERE](https://bit.ly/stopthetrollers)",true)
        .addField('<:stt_link:894863362595373076> VOTE PAGE:', "[VOTE HERE](https://top.gg/bot/860190622291066894)", true)
        .setFooter(`Created by FekyDEV#2644 | Stop The Trollers`, `${bot_logo}` )
        .setTimestamp()
        //

      var embed = new Discord.MessageEmbed()
      .setColor(bot_color)
      .setTitle('ADMIN BOT INFO')
      .addField('<:stt_guide:896337630587936798> Total Guilds', `${index.guidess}`, true)
      .addField('<:stt_members:894987766012706877> Total Users', `${index.userss}`, true)
      .addField(`<:stt_shop:896337630378205196> Servers:`, `SOON`)
      .setFooter(`${bot_name}`, `${bot_logo}` )
      .setTimestamp()
    //  
    module.exports = Object.freeze({
      embed: embed,
      embed2: embed2
    });

            interaction.reply({
                embeds: [ embed2 ],
                components: [ menu ],
                ephemeral: interaction.options.getBoolean('hide')
            })
    }
    

}
