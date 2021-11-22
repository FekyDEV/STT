const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';
//
const badges = require("discord-badges"); // DETECT USER BADGES
const moment = require('moment');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Shows info about mentioned user.")
        .addUserOption(option =>
            option.setName('mention')
                .setDescription('Mention a user')
                .setRequired(true))
                
                .addBooleanOption(option => option
                    .setName('hide')
                    .setDescription('Do you want to hide our interaction ?')
                    
                ),   

    async execute(interaction) {
       const user2 = interaction.options.getUser('mention')
       const user3 = user2.id

       console.log(user2)
       //
       const x2 = Date.now() - user2.createdAt;
      const tagcreated = Math.floor(x2 / 86400000);
      //
      const tagcreationDate_date = moment
        .utc(user2.createdAt)
        .format("DD/MM/YYYY");
      console.log(tagcreationDate_date)
      //
      const tagcreationDate_hours = moment
        .utc(user2.createdAt)
        .format("HH:mm:ss");
          console.log(tagcreationDate_hours)
        //
        /*let joiningDate_date = moment
        .utc(user2.joinedAt).utcOffset(+2).format("DD/MM/YYYY");
        let joiningDate_hours = moment
        .utc(user2.joinedAt).utcOffset(+2).format("HH:mm:ss");*/
          //
        badges
            .badges(user2)
            .then((response) => {
             let result = "";
              for (let i = 0; i < response.length; i++) {
                result += `${response[i].url}\n`;
              }
        //
            /*const user_permisssions = []
            if(user3.permissions.has("ADMINISTRATOR")) {
                user_permisssions.push("Administrator !")
            }*/
        //
        const info_embed = new Discord.MessageEmbed()
        .setAuthor(user2.tag, user2.displayAvatarURL({ dynamic:true }))
        .setColor(0x36393F)
        .setDescription("> <:stt_beta:899703562316181526>")
        .addField("<:stt_id:903032294590255106> ID:", "`\`\`" + user2.id + "\`\`\`")
        .addField("<:stt_ticket:894863362503110678> Nickname:", "`\`\`" + user2.username + "\`\`\`", true)
        .addField("<:stt_hastag:894863362284982273> Discriminator:", "`\`\`" + "#" + user2.discriminator + "\`\`\`", true)
        .addField("<:stt_settings:896337630462115871> Permissions: <:stt_soon:899704071508877313>", "`\`\` `\`\`", true)
        .addField("<:stt_members:894987766012706877> Created at:", "`\`\`" + `- ${tagcreated} days ago\n` + `- ${tagcreationDate_date}\n` + `- ${tagcreationDate_hours}` + "`\`\`", true)
        .addField("<:stt_invite:896337630315294742> Joined at: <:stt_soon:899704071508877313>", "`\`\`" + `- \n` + `- \n` + `- ` + "`\`\`", true)
        .addField("Badges", "> " + result)
        .setFooter(`${bot_name}`, `${bot_logo}`)
        .setTimestamp();
          //
            interaction.reply({
                embeds: [ info_embed ],
                //components: [row],
                ephemeral: interaction.options.getBoolean('hide')
            })
        })     
    }
}
