const BaseCommand = require('../../utils/structures/BaseCommand');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

const mongoose = require('mongoose');

module.exports = class ListReactionsCommand extends BaseCommand {
  constructor() {
    super('listreactions', 'admin', ["lr"]);
  }

  async run(client, message, args) {
    //console.time('ListReactions Command');

    

    try {
      const listEmbed = new Discord.MessageEmbed()
      .setTitle("Reaction Roles List")
      .setColor("bf3f3f")

      const query = GuildConfig.where({ guildId: message.guild.id });
      await query.findOne(function (err, guild) {
        if (err)
          return handleError(err);
        if (guild) {
          var reactionRoles = guild.get('reactionRoles');
          for(var i in reactionRoles)
          {
            var rrObject = reactionRoles[i];
            listEmbed.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
          }
          message.channel.send(listEmbed);
        }
      });
    }
    catch{
      console.error();
    }
    
    //console.timeEnd('ListReactions Command');
  }
}
