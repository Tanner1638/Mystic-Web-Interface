const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * replies with a template embed. Will need to be updated later
 * @version 4.2.1
 * TODO@Tanner1638 #37 Edit createEmbed command to be customizable.
 */

module.exports = class CreateEmbedCommand extends BaseCommand {
  constructor() {
    super('createEmbed', 'admin', []);
  }

  run(client, message, args) {
    console.log('createEmbed command works\n');

    var member = message.author;

    console.log(member.username);
    console.log(member.avatar);

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