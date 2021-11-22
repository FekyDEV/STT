const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel  } = require('@discordjs/voice');
//
const { Client, Intents, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client({  
    intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
  ]
});
//
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
//
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
//

module.exports = {
    data: new SlashCommandBuilder()
        .setName("together")
        .setDescription("Play & Watch Together with your friends.")
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose what do you want, watch or play ?')
                .addChoice('YouTube','watch_yt')
                .addChoice('Poker 18+','play_poker')
                .addChoice('Chess','play_chess')
                .addChoice('Fishing','play_fishing')
                .setRequired(true)
    )
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('Choose a VOICE channel !')
            .setRequired(true)
),   

    async execute(interaction) {
       const user2 = interaction.options.getUser('mention')

        const together_embed = new Discord.MessageEmbed()
        .setColor(`${bot_color}`)
        .setImage('https://i.imgur.com/TlNvTNW.png')
        //.setTitle('Together Command')
        .setDescription("<:stt_beta:899703562316181526> __Testing Version (BETA)__ \n \n > Invite you friends and watch & play **together** ! \n \n__You have to select a Voice Channel !__")
        .setFooter(bot_name, bot_logo)
        .setTimestamp()
        //
        const interakcia_vysledok = interaction.options.getString('category')
        console.log(interakcia_vysledok)
        //
        try {
            const interakcia_voice_vysledok = interaction.options.getChannel('channel')

            const connection = joinVoiceChannel({
                channelId: interakcia_voice_vysledok.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
          }catch(err) {
            console.log(err)
          }
      
            //
            const interakcia_voice_vysledok2 = interaction.options.getChannel('channel')

            if(interakcia_vysledok == "watch_yt") {
              try{

            client.discordTogether.createTogetherCode(interakcia_voice_vysledok2.id,'youtube').then(async invite => {
            //
            const button_yt = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setURL(invite.code)
                    .setLabel('Togheter Link') // OBSAH SPRAVY
                    .setStyle('LINK'), // TYP TLACITKASPRAVY
                );
            //
                interaction.reply({
                    content: `**-> __USE BUTTON !!!__**`,
                    components: [ button_yt ],
                    embeds: [ together_embed ],
                    ephemeral: interaction.options.getBoolean('hide')
                })  
                return;  
            });
          }catch(err) {
            console.log("YT: " + err)      
          }
        };
            //
            if(interakcia_vysledok == "play_poker") {
              try{
                client.discordTogether.createTogetherCode(interakcia_voice_vysledok2.id,'poker').then(async invite => {
                    console.log(invite)
                    console.log(invite.code)
                //
                const button_poker = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setURL(invite.code)
                    .setLabel('Togheter Link') // OBSAH SPRAVY
                    .setStyle('LINK'), // TYP TLACITKASPRAVY
                );
                //
                 interaction.reply({
                    content: `**-> __USE BUTTON !!!__**`,
                    components: [ button_poker ],
                    embeds: [ together_embed ],
                    ephemeral: interaction.options.getBoolean('hide')
                })  
                return;
            });
          }catch(err) {
            console.log("POKER: " + err)      
          }
        };
        //
        if(interakcia_vysledok == "play_chess") {
          try{
            client.discordTogether.createTogetherCode(interakcia_voice_vysledok2.id,'chess').then(async invite => {
            //
            const button_chess = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL(invite.code)
                .setLabel('Togheter Link') // OBSAH SPRAVY
                .setStyle('LINK'), // TYP TLACITKASPRAVY
            );
            //
             interaction.reply({
                content: `**-> __USE BUTTON !!!__**`,
                components: [ button_chess ],
                embeds: [ together_embed ],
                ephemeral: interaction.options.getBoolean('hide')
            })  
            return;
        });
      }catch(err) {
        console.log("CHESS: " + err)   
      }
        }
      
        if(interakcia_vysledok == "play_fishing") {
          try{
            client.discordTogether.createTogetherCode(interakcia_voice_vysledok2.id,'fishing').then(async invite => {
            //
            const button_fishing = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL(invite.code)
                .setLabel('Togheter Link') // OBSAH SPRAVY
                .setStyle('LINK'), // TYP TLACITKASPRAVY
            );
            //
             interaction.reply({
                content: `**-> __USE BUTTON !!!__**`,
                components: [ button_fishing ],
                embeds: [ together_embed ],
                ephemeral: interaction.options.getBoolean('hide')
            })  
            return;
        });
      }catch(err) {
        console.log("FISHING: " + err)
      }
    } 
    }
}
