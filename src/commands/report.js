const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const axios = require('axios');
const reportconfig = require('../db/schemas/reportconfig.js')
const premium = require('../db/schemas/premium.js');
const report = require('../db/schemas/report.js');
//const stats = require('../db/schemas/Stats');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Send a Report')
        .addStringOption(option =>
            option.setName("message")
                .setDescription("The message that will go with the Report.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("type")
                .setDescription("Type of Report. [BETA]")
                .setRequired(false)
                    .addChoice('User', 'User')
	  	    .addChoice('Bug', 'Bug')
                    .addChoice('Other', 'Other')
        )
        .addBooleanOption(option =>
            option.setName("anon")
                .setDescription("Send your Report Anonymously.")
                .setRequired(false)
        ),
    async execute(interaction) {
        const data = await getReportConfig(interaction.guild);
        const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        //
        const type = interaction.options.getString('type')
	   if (data.enabled) {
            const channel = await interaction.guild.channels.cache.get(data.channel);
            if (data.channel) {
                if (!interaction.guild.me.permissionsIn(channel).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) {
                    await interaction.reply({ content: "I am missing the following permissions in the report logs channel:\n\`VIEW_CHANNEL\` and/or \`SEND_MESSAGES\`", ephemeral: true });
                } else {
                    const reportMessage = interaction.options.getString("message", true);
                    if (reportMessage.length < 6) {
                        await interaction.reply({ content: 'Write a longer message!', ephemeral: true })
                    } else {
                        const embed = new MessageEmbed()
                            .setColor("#fe5b63")
                            .setDescription(`<:success:910068011887652864> ${data.text}`)
                            .addField("Type: ", '> ' + interaction.options.getString('type'), true)
                            .addField("Anon", '> ' + interaction.options.getBoolean('anon'), true)
                            .addField("⠀\n<:list:909910535666024559> Your Message", '> ' + reportMessage)
                            .setFooter(interaction.guild.name, info.iconURL({ format: "png" }))
                            .setTimestamp()

                        const reportEmbed = new MessageEmbed()
                          .setTitle("<:a:894863362658283550> __New Report__ !")
                          .setThumbnail(interaction.user.displayAvatarURL( { dynamic: true }))
                          .setColor("#fe5b63")
                          .setFooter(`${interaction.guild.name}`, info.iconURL({ format: "png" }))
                          .setTimestamp()

                    	if ( type == "User") {
                         	reportEmbed.setDescription("**Type:** User <:a:894987766012706877>")
                    	} else if ( type == "Bug"){
                        	reportEmbed.setDescription("**Type:** Bug <:a:896337630680211456>")
                    	} else if ( type == "Other") {
                        	reportEmbed.setDescription("**Type:** Other <:stt_guide:896337630587936798>")
                    	} else {
                            reportEmbed.setDescription("**Type:** None <:stt_pooperror:894987766046285854>")
                        }

                    if (!interaction.options.getBoolean("anon")) {
                        reportEmbed.addField("⠀\n<:a:894863362503110678> Username:", interaction.user.username + "#" + interaction.user.discriminator, true)
                        reportEmbed.addField("⠀\n<:a:903032294590255106> User ID:", '||' +interaction.user.id + '||', true)
                    }

                    reportEmbed.addField("<:a:896337630378205196> Report Message:", '> ' + reportMessage)
                    reportEmbed.addField("⠀\n<:a:894863362251427881> Sponsored by Hyper Layer", 'This report was sponsored by [Hyper Layer](https://billing.hyperlayer.net/aff.php?aff=3), get your premium hosting today!');

			    
		/*if(type == "User" ) {
                        reportEmbed.setColor("#fe5b63")
                    } else if (type == "Bug") {
                        reportEmbed.setColor("#fe5b63")
                    }*/
			    
                        var premiumData = await getPremiumStatus(interaction.guild);
                        if (premiumData.status == true) {
                            function create_ID() {
                                var txt = "";
                                var num = "0123456789";

                                for (var i = 0; i < 6; i++)
                                    txt += num.charAt(Math.floor(Math.random() * num.length));

                                return txt;
                            }
                            const reportID = create_ID()

                            reportEmbed.addField("Report ID", reportID);
                            let newData = new report({
                                guildID: interaction.guild.id,
                                id: reportID,
				type: interaction.options.getString('type'),
                                content: reportMessage,
                                rUser: interaction.user.username,
                                rID: interaction.user.id,
                            });
                            newData.save();
                        }

                        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("report_spam")
                            .setLabel('Report Spam')
				            .setStyle('DANGER')
                        )

                        await interaction.reply({ ephemeral: true, embeds: [embed] });
                        await channel.send({ embeds: [reportEmbed], components: [ row ] });
                    }
                }
            } else {
                await interaction.reply({ content: "I can't seem to find the reports log channel. Please ask a mod/owner to look into it", ephemeral: true });
            }
        } else {
            await interaction.reply({ ephemeral: true, content: "The report system is currently disabled..." });
        }
        const int = interaction

    const collector = interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            try{
                console.log(int)
                if (i.customId === 'report_spam') {
                    console.log("New Report Spam !")
                    await i.update({ content: 'A button was clicked!', components: [] });

                //
                 const report_spam_embed = new MessageEmbed()
                    .setColor("#fe5b63")
                    .setTitle("| Spam Report")
                    .addField("⠀\n<:a:894863362503110678> Username:", 'test')
                    .addField("⠀\n<:a:903032294590255106> User ID:", '||' + 'test' + '||', true)
                    .setFooter(interaction.user.tag, interaction.user.displayAvatarURL( { dynamic: true } ))
                    .setTimestamp()
                    //
                //await axios.post("https://canary.discord.com/api/webhooks/911034046476337222/cgSoqPBOyHtOdOobNR1RXcH1SrjDS55UTSt5QjEpwdWglVtFJCI2bRMjwH10PGEWDOQQ", {
                //    username: "Report Spam",
                //    //avatar_url: inf.user.displayAvatarURL( { dynamic: true}),
                    //content: `**Report** joined ${guild.name} (${guild.id})`,
                //    embeds: [ report_spam_embed ],
                //})
                console.log("Sended to Webhook !")
            }
            } catch(err) {
                console.log(err)
            }
	        
    });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    },
    
};

async function getReportConfig(guild) {
    let doc = await reportconfig.findOne({ guildID: { $eq: guild.id } });
    if (!doc) {
        doc = await reportconfig.create({
            guildID: guild.id
        });
    }
    guild.reportconfig = doc;
    if (!guild.cache) guild.cache = {};
    guild.cache.reportconfig = true;
    return doc;
}

async function getPremiumStatus(guild) {
    if (guild.premium && guild.cache?.premium) return guild.premium;
    let doc = await premium.findOne({ guildID: { $eq: guild.id } });
    if (!doc) {
        doc = await premium.create({
            guildID: guild.id,
            status: false,
        });
    }
    guild.premium = doc;
    if (!guild.cache) guild.cache = {};
    guild.cache.premium = true;
    return doc;
}

async function plusReport(guild) {
    let doc = await stats.findOne({guildID : { $eq: guild.id } });
    if(!doc) {
        doc = await stats.create({
            guildID: guild.id,
            reports: 1,
            suggestions: 0,
        });
    } else {
        await doc.updateOne({ reports: reports++ });
    }
}

