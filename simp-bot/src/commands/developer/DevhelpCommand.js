const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class DevhelpCommand extends BaseCommand {
  constructor() {
    super('devhelp', 'developer', []);
  }

  run(client, message, args) {
    const commands = {
      '[ USER COMMANDS ]': '---------------------------',
      'help': 'Displays this message!',
      '[ ADMIN COMMANDS ]': '---------------------------',
      'assignInviteRole': 'Link a role for users to be given upon joining a specific invite link',
      'ban': 'Ban a user, optional to provide a reason',
      'kick': 'Kick a user',
      'purge': 'Bulk delete messages (1 - 99)',
      'say': 'make the bot say something! Specifiy a channel to send the message to another channel.',
      'setPrefix': 'change the servers prefix',
      '[ DEVELOPER COMMANDS ]': '---------------------------',
      'competing': 'set bot activity to competing in [message args]',
      'devhelp': 'display this message',
      'initGuild': 'initialize a guild that the bot is in already but is not stored in the database',
      'listeningTo': 'set bot activity to listening to [message args]',
      'ping': 'display latencey stats',
      'playing': 'set bot activity to playing [message args]',
      'query': 'query options: 1 - returns invite codes stored in database. 2 - fetches invites from Discord API. 3 - compares differences of uses from database to Discord API return',
      'setBotAvatar': 'set the bots avatar [static- avatar cannot be changed through command]',
      'setBotUsername': 'set the bots username [static- avatar cannot be changed through command]',
      'streaming': 'set bot activity to streaming [message args]',
      'updateGuild': 'duplicate of initGuild. Will remove later.',
      'watching': 'set bot activity to watching [message args]'
    }
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setURL('http://chaos-bot.xyz:3000/')
    .setAuthor('Chaos Commands', 'https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png', 'http://66.42.116.78:3000/')
    .setDescription('Here are a few commands you can use.');
    //.setFooter('Some footer text here', `https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png`);

    for(var command in commands){
      exampleEmbed.addField(`**${command}**`, ` • ${commands[command]}`);
    }
    
    message.channel.send(exampleEmbed);
  }
}