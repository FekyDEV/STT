const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
//
const axios = require('axios')
const report = require('../db/report_schema.js');

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
    async execute(int) {
        const userId = int.options.getString('user')
        const userId_replaced = userId.replace('<@!','').replace('>','')
        const data = await getReport(userId_replaced);
        const info = int.client.application.partial ? await int.client.application.fetch() : int.client.application;

            let headersList144 = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.io)",
                "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
               }
               let reqOptions144 = {
                 url: "https://discord.com/api/users/" + userId_replaced,
                 method: "GET",
                 headers: headersList144,
               }
               axios.request(reqOptions144).catch((err) => {
               }).then(function (res2) {
                if(!res2){
                  int.reply("❌ Provide a valid user ID !") 
                      return;
               }
                   if(!data || data.status !== "accepted") {
                    const inspect_false_embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
                    .setAuthor('INSPECTED USER', "https://cdn.discordapp.com/emojis/894982664820506644.png?size=96")
                    .setDescription("**╚ isn't Blacklisted.**")
                    .addField(`<:stt_ticket:894863362503110678> User Tag`, res2.data.username + '#' + res2.data.discriminator , true)
                    .addField(`<:stt_id:903032294590255106>User ID`, "||" + res2.data.id + "||", true)
                    .setFooter(`${info.name}` )
                    .setTimestamp()
                    //  
                    int.reply({
                        embeds: [ inspect_false_embed ],
                        ephemeral: int.options.getBoolean('hide')
                    })
                      return;
                   } else {
                       if(data.status == "accepted") {
                          //
          const inspect_btn = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setURL(data.reportProof)
                    .setLabel('Proof')
                    .setStyle('LINK')
                );
                
        const inspect_true_embed = new MessageEmbed()
          .setColor('RED')
          .setThumbnail("https://cdn.discordapp.com/avatars/" + res2.data.id + "/" + res2.data.avatar + ".png")
          .setAuthor('INSPECTED USER', "https://cdn.discordapp.com/emojis/894982664447209554.png?size=80")
          .setDescription("**╚ is Blacklisted !**")
          .addField(`<:stt_ticket:894863362503110678> User Tag`, data.reportedUser, true)
          .addField(`<:stt_id:903032294590255106> User ID`, "||" + data.reportedUserID + "||", true)
          .addField(`<:stt_shop:896337630378205196> Reason`, data.reportMessage, false)
          .setFooter(`Blacklisted by ${data.admin}` )
          .setTimestamp()
          //
            int.reply({
                embeds: [ inspect_true_embed ],
                components: [inspect_btn],
                ephemeral: int.options.getBoolean('hide')
        })
        return; 
                       }
                   }
               }) // KONIEC DISCORD API #1
    }
}

async function getReport(user) {
    let doc = await report.findOne({ reportedUserID: { $eq: user.id } });
    if (!doc) {
        console.log("Nevermind...")
    }
    user.report = doc;
    return doc;
}