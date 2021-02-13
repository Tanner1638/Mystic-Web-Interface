const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ListReactionsCommand extends BaseCommand {
  constructor() {
    super('listreactions', 'admin', ["lr"]);
  }

  async run(client, message, args) {

    const listEmbed = new Discord.MessageEmbed()
    .setTitle("Reaction Roles List")
    .setColor("bf3f3f");

    var server = guildCache.get(message.guild.id);
    var reactionRoles = server.reactionRoles;
    for (var i in reactionRoles) {
      var rrObject = reactionRoles[i];
      listEmbed.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
    }
    message.channel.send(listEmbed);
    
  }
}
