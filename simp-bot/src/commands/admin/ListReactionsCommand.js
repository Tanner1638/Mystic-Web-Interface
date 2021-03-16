const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const cacheGuild = require('../../cache/cache');

module.exports = class ListReactionsCommand extends BaseCommand {
  constructor() {
    super('listreactions', 'admin', ["lr"]);
  }

  async run(client, message, args) {
    const info = new Discord.MessageEmbed()
    .setColor("bf3f3f");

    var Permissions = message.member.permissions;
    if(!(message.author.id === "542483559500218389")){
      if(!Permissions.has('MANAGE_ROLES')) {
        message.channel.bulkDelete(1);
        info.setTitle('Unauthorized Command.');
        info.setDescription("you dont have permissions to manage roles.")
        message.channel.send(info)
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }
    
    await cacheGuild(message.guild.id);
    server = await guildCache.get(message.guild.id);

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

