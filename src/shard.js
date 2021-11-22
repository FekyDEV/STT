require('dotenv').config()
const axios = require('axios');
const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
const { token } = require('./config.json');

const manager = new ShardingManager(__dirname + '/index.js', { token: "OTAxMTY2MDc0NTg0NzkzMDg4.YXL6Tw.fDsAUkhfhr-SBDj11bDjZ_4IEyA" });

manager.on('shardCreate', shard => console.log(chalk.yellow(`Launched shard ${shard.id}`)));

manager.spawn();

sendConfirm();

async function sendConfirm() {
    await axios.post("https://canary.discord.com/api/webhooks/907246848006316063/O-YkiN66-N20ULjwTzVL_EZpjguOB9_Wrwlvrp3p1lDfjgFTax17SfXkp-ruYZWJu31G", {
        username: "Report",
        content: `**Report** is currently starting up!`,
    })
}