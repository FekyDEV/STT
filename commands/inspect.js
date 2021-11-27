const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
//
const axios = require("axios")
const ip = '5.249.164.143'
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inspect")
        .setDescription("Inspect a user.")
        .addStringOption(option => option
            .setName('user')
            .setDescription('User User ID or User Mention.')
            .setRequired(true)
            
        )
        .addBooleanOption(option => option
            .setName('hide')
            .setDescription('Do you want to hide our interaction ?')
            
        ),   

    async execute(interaction) {
        const inspect_user_id = interaction.options.getString('user')
        const inspect_user_id_replace = inspect_user_id.replace('<@!','').replace('>','')
        console.log(inspect_user_id_replace)
        //
        let headersList144 = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
       }
       let reqOptions144 = {
         url: "https://discord.com/api/users/" + inspect_user_id_replace,
         method: "GET",
         headers: headersList144,
       }
       axios.request(reqOptions144).catch((err) => {
         interaction.reply("❌ Provide a valid user ID !")
         console.log('something is wrong')
         return;
          //if(err) return;
        })
        .then(function (res2) {
      //-//
      axios.get(`'http://' + ip + ':4000/reports/id/'` + inspect_user_id_replace)
      .then((res) => {
        //
        if(!res2) return;
        if(!res.data[0]) {
    const inspect_false_embed = new MessageEmbed()
        .setColor(`GREEN`)
        .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
        .setAuthor('INSPECTED USER is', "https://cdn.discordapp.com/emojis/894982664820506644.png?size=96")
        .setDescription("**╚ isn't Blacklisted.**")
        .addField(`<:stt_ticket:894863362503110678> User Tag`, res2.data.username + '#' + res2.data.discriminator , true)
        .addField(`<:stt_id:903032294590255106>User ID`, "||" + res2.data.id + "||", true)
        .setFooter(`${bot_name}`, `${bot_logo}` )
        .setTimestamp()
        //
            interaction.reply({
                embeds: [ inspect_false_embed ],
                //components: [row],
                ephemeral: interaction.options.getBoolean('hide')
        })
        return;
        }
        if(res.data[0].status == "accepted") {
        const inspect_true_embed = new MessageEmbed()
        .setColor('RED')
          .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
          .setAuthor('INSPECTED USER', "https://cdn.discordapp.com/emojis/894982664447209554.png?size=80")
          .setDescription("**╚ is Blacklisted !**")
          .addField(`<:stt_ticket:894863362503110678> User Tag`, res.data[0].reportedUser, true)
          .addField(`<:stt_id:903032294590255106> User ID`, "||" + res.data[0].reportedUserID + "||", true)
          .addField(`<:stt_shop:896337630378205196> Reason`, res.data[0].reportMessage + '\n \n' + res.data[0].reportProof, false)
          .setFooter(`Blacklisted by ${res.data[0].admin}`, `${bot_logo}` )
          .setTimestamp()
          //
            interaction.reply({
                embeds: [ inspect_true_embed ],
                //components: [row],
                ephemeral: interaction.options.getBoolean('hide')
        })
        return;
    } else {
      const inspect_false_embed = new MessageEmbed()
        .setColor(`GREEN`)
        .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
        .setAuthor('INSPECT USER', "https://cdn.discordapp.com/emojis/894982664820506644.png?size=96")
        .setDescription("**╚ Not Blacklisted.**")
        .addField(`<:stt_ticket:894863362503110678> User Tag`, res2.data.username + '#' + res2.data.discriminator , false)
        .addField(`<:stt_id:903032294590255106> User ID`, "||" + res2.data.id + "||", false)
        .setFooter(`${bot_name}`, `${bot_logo}` )
        .setTimestamp()
        //
            interaction.reply({
                embeds: [  inspect_false_embed ],
                //components: [row],
                ephemeral: interaction.options.getBoolean('hide')
        })
        return;
    }
    })
      })
    }
}
