module.exports = {
	name: 'collect',
	async execute(interaction) {
        console.log("New interaction !")
        if(interaction.customId == "report_spam") {
            console.log("New Report Spam !")
        }
	},
};