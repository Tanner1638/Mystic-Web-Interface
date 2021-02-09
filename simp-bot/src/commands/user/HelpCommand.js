const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * if no following arguments: replies with an embed of the different catagories of commands
 * otherwise: replies with an embed of commands related to the catagory specified.
 * @version 4.2.2
 */

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'user', []);
  }


  run(client, message, args) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setURL('http://66.42.116.78:3000/')
    .setAuthor('Chaos Command Catagories', 'https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png', 'http://66.42.116.78:3000/')
    .setDescription('Some description here')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    .setTimestamp()
    .setFooter('Some footer text here', `https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png`);
    
    message.channel.send(exampleEmbed);
  }
}