const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ListReactionsCommand extends BaseCommand {
  constructor() {
    super('listreactions', 'admin', ["lr"]);
  }

  async run(client, message, args) {

    const listEmbed1 = new Discord.MessageEmbed()
    .setTitle("Reaction Roles List")
    .setColor("bf3f3f");
    const listEmbed2 = new Discord.MessageEmbed()
    .setTitle("Reaction Roles List")
    .setColor("bf3f3f");
    var embedCollection = [];

    var server = guildCache.get(message.guild.id);
    var reactionRoles = server.reactionRoles;
    for (var i in reactionRoles) {
      var rrObject = reactionRoles[i];
      if(i < 20){ 
        listEmbed1.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
      }
      if(i >= 20 && i<40){
        listEmbed2.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
      }
    }
    sendEmbed(reactionRoles, message, listEmbed1, listEmbed2);
    
    
  }
}
function sendEmbed(reactionRoles, message, listEmbed1, listEmbed2) {
  if (reactionRoles.length < 20) {
    message.channel.send(listEmbed1);
  }
  else {
    message.channel.send(listEmbed1);
    message.channel.send(listEmbed2);
  }
}

