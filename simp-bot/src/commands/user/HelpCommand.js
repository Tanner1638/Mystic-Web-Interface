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
    //console.time('Help Command');

    const commands = {
      '!help': 'Displays this message!',
      '\u200b': `\u200b`,
      '[ ADMIN COMMANDS ]': `\u200b`,
      '!inviteRole | !ir': 'Link a role for users to be given upon joining a specific invite link',
      '!ban': 'Ban a user, optional to provide a reason [reason will show up in the audit log]',
      '!dashboard': 'Sends an embed with a link straight to the dashboard!',
      '!kick': 'Kick a user',
      '!purge': 'Bulk delete messages (1 - 99)',
      '!say': 'make the bot say something! Specifiy a channel to send the message to another channel.',
      '!reactionRole | !rr': 'Make reaction roles! Users can react to an emoji and receive a role!',
      '!listReactions | !lr': 'Lists all reaction roles setup.',
      '!removeRole | !rrr': 'Remove an active reaction role',
      '!setPrefix | !sp': 'change the servers prefix'
    }
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
    .setTitle("Chaos Bot Commands")
    .setDescription("NOTE: Replace ! with your custom prefix if you've set one!");
    //.setFooter('Some footer text here', `https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png`);

    for(var command in commands){
      exampleEmbed.addField(`**${command}**`, ` • ${commands[command]}`);
    }
    
    message.channel.send(exampleEmbed);
    //console.timeEnd('Help Command');
  }
}