//
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, WebhookClient  } = require('discord.js');
const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
//a
const config = require("../Data/config.json");
//
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
//
const axios = require("axios")
const moment = require('moment');
//
const bot_name = 'Stop The Trollers'
const bot_logo = 'https://i.imgur.com/D0FjS3H.png';
const bot_version = 'v1.5' // AKTUÁLNA VERZIA
const bot_color = '0x370595';

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
            .setName('reason')
            .setDescription('Reason for the report (Only English)')
            .setRequired(true)          
        )
        .addStringOption(option => option
            .setName('proof')
            .setDescription('Fullscreen Screenshot (Link - https:// ...)')
            .setRequired(true)            
        )
        .addStringOption(option => option
            .setName('proof_2')
            .setDescription('Fullscreen Screenshot (Link - https:// ...)')
            .setRequired(false)            
        ),   

    async execute(interaction) {
        axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
     .then((res_user) => { 
         if(!res_user.data[0]) {
            axios.post('http://95.156.227.203:7000/users/', {
                id: interaction.user.id,
                username: interaction.user.tag,
                have_report: false,
                xp: 0,
                bdg_early: false
              })
              console.log("NO DATA")
         }     
        })
        
    axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
     .then((res_user) => { 
        if(!res_user.data[0]) {
            console.log("Vytvaram nový profil !")
            interaction.reply({ content: 'Let me create your profile! \n It will take a few seconds, then you can try again :)', ephemeral: true})
            console.log("1")
            console.log("2")
            console.log("3")
            console.log("4")
            console.log("5")
            console.log("6")
            console.log("7")
            console.log("8")
            console.log("9")
            console.log("10")
            console.log("11")
            console.log("12")
            console.log("13")
            console.log("14")
            console.log("15")
            console.log("16")
            console.log("17")
            console.log("18")
        } else {
        if(res_user.data[0].have_report == true) {
            interaction.reply( { content: 'You already have Pending Report !', ephemeral: true})
            return;
        } else {
    //
        let headersList1 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
           "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions1 = {
             url: "https://discord.com/api/users/" + interaction.options.getString('userid'),
             method: "GET",
             headers: headersList1,
           }
           axios.request(reqOptions1).catch((err) => {
            interaction.reply("❌ Provide a valid user ID !")
            if(err) return;
          })
          .then(function (res_discord) {
    //
    function report_makeid() {
        var text = "";
        var possible = "0123456789";
      
        for (var i = 0; i < 6; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
      const random_id = report_makeid()
      const report_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm:ss");
    //
        const confirm_embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true }))
        .setTitle("WARNING !")
        .setTimestamp()
        .setFooter(bot_name, bot_logo)
        .setDescription('> You confirm that the information and proof you submitted is correct and not edited in any way. \n \n > You confirm that the images you submitted are fullscreen images \n \n __Breaking this will lead to a permanent blacklist.__ \n \n**+** __If you want to get an answer from the Staff, enable your DM !__')
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
          //
    axios.post('http://95.156.227.203:4000/reports/', {
        reportID: random_id,
        status: "pending",
        userID: interaction.user.id,
        user: interaction.user.tag,
        reportedUser: `${res_discord.data.username}#${res_discord.data.discriminator}`,
        reportedUserID: interaction.options.getString('userid'),
        reportMessage: interaction.options.getString('reason'),
        reportProof: interaction.options.getString('proof'),
        timeCreated: report_date
      })
      //
          interaction.reply({
            embeds: [ confirm_embed ],
            components: [confirm_button],
            ephemeral: true
        })
    })
}
        }
})
}

}

client.on("interactionCreate", async (interaction, message) => {

    if(interaction.customId === "confirm_button"){
       axios.get('http://95.156.227.203:4000/reports/userid/' + interaction.user.id)
        .then((res) => { 

        let headersList1 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions1 = {
            url: "https://discord.com/api/users/" + res.data[0].reportedUserID,
             method: "GET",
             headers: headersList1,
           }
           axios.request(reqOptions1).catch((err) => {
            interaction.reply("❌ Provide a valid user ID !")
            if(err) return;
          })
           .then(function (res_discord) {
///
            axios.get('http://95.156.227.203:4000/reports/userid/' + interaction.user.id)
        .then((res) => { 
              const report_log_embed = new Discord.MessageEmbed()
              .setColor(`${bot_color}`)
                .setTitle("NEW Report ! | ID: " + res.data[0].reportID)
                .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${interaction.user.tag}⠀⠀⠀⠀⠀||${interaction.user.id}||`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + res_discord.data.id + "/" + res_discord.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
                //.addField("<:stt_ticket:894863362503110678> User Name", `${res.data[0].user}`,true)
                //.addField("<:stt_id:903032294590255106> User ID", `||${res.data[0].userID} ||`,true)
                .addField("<:stt_ticket:894863362503110678> Reported User Name", `${res.data[0].reportedUser}`,true)
                .addField("<:stt_id:903032294590255106> Reported User ID", `||${res.data[0].reportedUserID} ||`,true)
                .addField("<:stt_shop:896337630378205196>  Report Message", `${res.data[0].reportMessage} \n \n ${res.data[0].reportProof}`, false)
                .setFooter(`Date: ${res.data[0].timeCreated}`, 'https://cdn.discordapp.com/emojis/905529168953999371.png?size=96' )
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
                console.log('CONFIRM 1/4')
            axios.get('http://95.156.227.203:4000/reports/userid/' + interaction.user.id)
                .then((ress) => { 
                    console.log('CONFIRM 2/4')
                    console.log(interaction.user.id)
                    console.log('http://95.156.227.203:7000/users/id/' + interaction.user.id)
                    console.log(ress.data[0].reportID)
                    console.log('CONFIRM 3/4')


    client.channels.fetch('913364277522468866')
    .then(channel => channel.send({ content: ress.data[0].reportID, embeds: [ report_log_embed ], components: [ rozhodnutie_reporta ]}).catch(console.error))
    .catch(console.error);

    /*axios.post('https://canary.discord.com/api/webhooks/913364401497731092/xi_hbohJvQ6GBoLFfReJdqf64HCTdVfEjlqDRtb5GRP33cXAZQKj4c_GS8JgJBbvLdgV', {
      username: "STT | LOG",
      avatar_url: client.user.displayAvatarURL( { dynamic: true}),
      content: ress.data[0].reportID,
      embeds: [ report_log_embed ],
      components: [ rozhodnutie_reporta ] // NOT WORKING :(
  })*/

    console.log('CONFIRM 4/4')

        })
    })
            })

///
            //
             //      
        let headersList144 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions144 = {
             url: "https://discord.com/api/users/" + res.data[0].reportedUserID,
             method: "GET",
             headers: headersList144,
           }
           axios.request(reqOptions144).catch((err) => {
            interaction.reply("❌ Provide a valid user ID !")
            if(err) return;
          })
          .then(function (res_dis) {
          //
        const report_user_embed = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .setDescription("<:stt_check:894982664820506644>  __Your Report has been sended successfully__ !")
                .setThumbnail("https://cdn.discordapp.com/avatars/" + res_dis.data.id + "/" + res_dis.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .addField("<:stt_ticket:894863362503110678> User Name", `${res_dis.data.username}#${res_dis.data.discriminator}`,true)
                .addField("<:stt_id:903032294590255106> User ID", `||${res.data[0].reportedUserID} ||`,true)
                .addField("<:stt_shop:896337630378205196>  Report Message", `${res.data[0].reportMessage} \n \n > Now you have to wait for Staff respond !`)
                .setFooter(`Status: Pending`, 'https://cdn.discordapp.com/emojis/905529168953999371.png?size=96' )
                .setTimestamp()
              //
                    if(res.data[0].reportProof.includes("https://")) {
                const report_link = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setURL(res.data[0].reportProof)
                    .setLabel('Proof Link') // OBSAH SPRAVY
                    .setStyle('LINK'), // TYP TLACITKA
                    //
                );
                interaction.update({
                    embeds: [ report_user_embed ],
                    components: [report_link],
                    ephemeral: true
                })
                axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
            .then((res_data) => {   
              axios({
                method: 'patch',
                url: 'http://95.156.227.203:7000/users/id/' + interaction.user.id,
                data: [    
                        { "propName": "have_report", "value": true }
                      ] 
              })      
              console.log("User have now a new report !")
            })
    //////////////////// 
            } 
        })
      })
     } // KONIEC IF
     if(interaction.customId === "cancel_button"){
        axios.delete('http://95.156.227.203:4000/reports/uid/' + interaction.user.id)
        .then((res111) => { 
            console.log("Dáta boli vymazané !")
        //
        const cancel_embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true }))
        .setTitle("Report was Canceled !")
        .setTimestamp()
        .setFooter(bot_name, bot_logo)
        //

        interaction.update({
            embeds: [ cancel_embed ],
            components: [ ],
            //content: 'Interaction was Canceled !',
            ephemeral: true
        })
    }) // KONIEC DELETE REPORT API
            axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
            .then((res_data) => {   
              axios({
                method: 'patch',
                url: 'http://95.156.227.203:7000/users/id/' + interaction.user.id,
                data: [    
                        { "propName": "have_report", "value": false }
                      ] 
              })      
              console.log("User have now no reports !")
            })
     } // KONIEC IF

     if(interaction.customId === "report_accept"){
        console.log("NEW INTERACTION: Report Accepted")
        //
        const accepted_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm:ss");
        //
        //console.log(interaction)
        console.log('-----------------------------------------')
        //console.log(interaction.message)
        console.log(interaction.message.content)
        //
        axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
        .then((res) => {   
          axios({
            method: 'patch',
            url: 'http://95.156.227.203:7000/users/id/' + interaction.user.id,
            data: [    
                    { "propName": "admin_approved_reports", "value": res.data[0].admin_approved_reports + 1 },
                    { "propName": "admin_total_reports", "value": res.data[0].admin_total_reports + 1 }
                  ] 
          })      
          console.log("Accepted Report counted !")
        })
        //
        axios.get('http://95.156.227.203:4000/reports/rid/' + interaction.message.content)
        .then((res_report) => { 
        axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
                        .then((res) => {   
                          axios({
                            method: 'patch',
                            url: 'http://95.156.227.203:7000/users/id/' + res_report.data[0].userID,
                            data: [    
                                    { "propName": "have_report", "value": false }
                                  ] 
                          })      
                          console.log("User have now new report !")
                axios({
                method: 'patch',
                 url: 'http://95.156.227.203:4000/reports/userid/' + res_report.data[0].userID,
                 data: [ 
                        { "propName": "status", "value": "accepted" },
                        { "propName": "admin", "value": interaction.user.tag },
                        { "propName": "timeChanged", "value": accepted_date }
                       ] 
                    })      
                    console.log("Report Acccepted !") 
            //
            let headersList1 = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.io)",
               "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
               }
               let reqOptions1 = {
                 url: "https://discord.com/api/users/" + res_report.data[0].reportedUserID,
                 method: "GET",
                 headers: headersList1,
               }
               axios.request(reqOptions1).catch((err) => {
                interaction.reply("❌ Provide a valid user ID !")
                if(err) return;
              })
              .then(function (res_discord) {
            const report_accepted_log_embed = new Discord.MessageEmbed()
              .setColor(`${bot_color}`)
                .setTitle("Report | ID: " + res_report.data[0].reportID)
                .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${res_report.data[0].user}⠀⠀⠀⠀⠀||${res_report.data[0].userID}||`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + res_discord.data.id + "/" + res_discord.data.avatar + ".png")
                .setImage('https://i.imgur.com/TlNvTNW.png')
                .addField("<:stt_ticket:894863362503110678> Reported User Name", `${res_report.data[0].reportedUser}`,true)
                .addField("<:stt_id:903032294590255106> Reported User ID", `||${res_report.data[0].reportedUserID} ||`,true)
                .addField("<:stt_shop:896337630378205196>  Report Message", `${res_report.data[0].reportMessage} \n \n ${res_report.data[0].reportProof}`, false)
                .setFooter(`Date: ${accepted_date}`, 'https://cdn.discordapp.com/emojis/905529657217146950.png?size=96' )
                .setTimestamp()
            //
            interaction.update({
              embeds: [  ],
              components: [ ],
              content: 'Success!',
          })
          //
          axios.post('https://canary.discord.com/api/webhooks/913364429230440449/0QRPGseKwCwDkt2WGcv0L4_KFpr9g3QBtQZ-xu98YmcjgZwqfHg5ZOBQwX1viuyJz4bO', {
            username: "STT | LOG",
            avatar_url: client.user.displayAvatarURL( { dynamic: true}),
	        embeds: [ report_accepted_log_embed ],
        })
        console.log("WEBHOOK SENDED !")
          //
        })
        })
    })
}
////
if(interaction.customId === "report_deny"){
    console.log("NEW INTERACTION: Report Denied")
    //
    const denied_date = moment().utcOffset(+1).format("DD/MM/YYYY - HH:mm:ss");
    //
    //console.log(interaction)
    console.log('-----------------------------------------')
    //console.log(interaction.message)
    console.log(interaction.message.content)
    //
    axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
        .then((res) => {   
          axios({
            method: 'patch',
            url: 'http://95.156.227.203:7000/users/id/' + interaction.user.id,
            data: [    
                    { "propName": "admin_denied_reports", "value": res.data[0].admin_denied_reports + 1 },
                    { "propName": "admin_total_reports", "value": res.data[0].admin_total_reports + 1 }
                  ] 
          })      
          console.log("Denied Report counted !")
        })
    //
    axios.get('http://95.156.227.203:4000/reports/rid/' + interaction.message.content)
    .then((res_report) => { 

    axios.get('http://95.156.227.203:7000/users/id/' + interaction.user.id)
                    .then((res) => {   
                      axios({
                        method: 'patch',
                        url: 'http://95.156.227.203:7000/users/id/' + res_report.data[0].userID,
                        data: [    
                                { "propName": "have_report", "value": false }
                              ] 
                      })      
                      console.log("User have now new report !")
        //
        let headersList1 = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
           "Authorization": "Bot ODgwMDQ3NzQ4NjA1NDQ0MTU3.YSYmVQ.mnDEfwBTaoJqT53U6vGbb6F11GI" 
           }
           let reqOptions1 = {
             url: "https://discord.com/api/users/" + res_report.data[0].reportedUserID,
             method: "GET",
             headers: headersList1,
           }
           axios.request(reqOptions1).catch((err) => {
            interaction.reply("❌ Provide a valid user ID !")
            if(err) return;
          })
          .then(function (res_discord) {
        const report_denied_log_embed = new Discord.MessageEmbed()
          .setColor(`${bot_color}`)
            .setTitle("Report | ID: " + res_report.data[0].reportID)
            .setDescription(`<:stt_ticket:894863362503110678> **User Name**⠀⠀⠀⠀⠀<:stt_id:903032294590255106> **User ID** \n ${res_report.data[0].user}⠀⠀⠀⠀⠀||${res_report.data[0].userID}||`)
            .setThumbnail("https://cdn.discordapp.com/avatars/" + res_discord.data.id + "/" + res_discord.data.avatar + ".png")
            .setImage('https://i.imgur.com/TlNvTNW.png')
            .addField("<:stt_ticket:894863362503110678> Reported User Name", `${res_report.data[0].reportedUser}`,true)
            .addField("<:stt_id:903032294590255106> Reported User ID", `||${res_report.data[0].reportedUserID} ||`,true)
            .addField("<:stt_shop:896337630378205196>  Report Message", `${res_report.data[0].reportMessage} \n \n ${res_report.data[0].reportProof}`, false)
            .setFooter(`Date: ${denied_date}`, 'https://cdn.discordapp.com/emojis/906514271217811467.png?size=96' )
            .setTimestamp()
        //
        interaction.update({
          embeds: [  ],
          components: [ ],
          content: 'Success!',
          ephemeral: true
      })
        //
        axios.post('https://canary.discord.com/api/webhooks/913364476277952592/djH0t3-azLk2H8mDuuHsc90Oj1OEeswUY9I365whoevgieyQhMG7QcW5VG2xdoR5gZ8D', {
          username: "STT | LOG",
          avatar_url: client.user.displayAvatarURL( { dynamic: true}),
        embeds: [ report_denied_log_embed ],
      })
      console.log("WEBHOOK SENDED !")
        //
        axios({
          method: 'delete',
           url: 'http://95.156.227.203:4000/reports/uid/' + res_report.data[0].userID
              })      
              console.log("Report Denied and Deleted !") 
    })
    })
})
}

}) // RES END
client.login(config.token);
