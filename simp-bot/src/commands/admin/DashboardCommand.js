const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * replies with an embed with a link to the bot dashboard.
 * @version 4.2.1
 */

module.exports = class DashboardCommand extends BaseCommand {
  constructor() {
    super('dashboard', 'admin', []);
  }

  run(client, message, args) {
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setTitle('Chaos Bot Dashboard')
    .setDescription('http://chaos-bot.xyz:3000/')
    .setThumbnail('https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png');

    message.reply(exampleEmbed);
  }
}