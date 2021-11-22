const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
//
const userprofile = require('../db/schemas/profile.js')
//

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Shows your Report Profile.'),
	async execute(interaction) {
        const info = interaction.client.application.partial ? await interaction.client.application.fetch() : interaction.client.application;
        const data = await getUserProfile(interaction.user);
        //
        // TRUST LEVEL //
        const trust_level = data.level
          console.log(data)
        
        const trust_level_2 = trust_level / 5
            console.log("TRST LVL = " + trust_level_2)



        // END
        const profile_user_embed = new MessageEmbed()
        .setColor("#fe5b63")
        .setTitle("<:stt_shop:896337630378205196> Your Report Profile") 
         //.setAuthor(interaction.member.tag, interaction.member.displayAvatarURL( { dynamic:true }))
         .setDescription("<:stt_beta:899703562316181526> __Testing Version (BETA)__")
         .addField("<:stt_ticket:894863362503110678> Username", "> " + 'test', true)
         .addField("<:stt_id:903032294590255106> User ID", "||" + 'test' + "||", true)
         .addField("Badges - From Report", "> " + 'test', false)
         .addField("Level", "> " + data.level, true)
         .addField("⠀","<:stt_rules:896337630550167562> **TIP:** __Report users, bugs or other and get higher Trust Level__ ! \n<:stt_rules:896337630550167562> **TIP:** __Get a lot of approval and earn a badge__ ! __")
         .setFooter(info.name, info.iconURL({ format: "png" }))
         .setTimestamp()
         //
         interaction.reply({
             embeds: [ profile_user_embed ],
             ephemeral: true,
         })
	},
};

async function getUserProfile(user) {
    //
    let doc = await userprofile.findOne({ userID: { $eq: user.id } });
    if (!doc) {
        doc = await userprofile.create({
            userID: user.id,
            name: user.tag,
            level: 0,
            verified: false,
        });
    }
    
    user.userprofile = doc;
    if (!user.cache) user.cache = {};
    user.cache.userprofile = true;
    return doc;
}