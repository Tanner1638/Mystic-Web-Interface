const BaseCommand = require('../../utils/structures/BaseCommand');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

const mongoose = require('mongoose');

module.exports = class ListReactionsCommand extends BaseCommand {
  constructor() {
    super('listReactions', 'admin', ["lr"]);
  }

  async run(client, message, args) {

    

    try {
      const query = GuildConfig.where({ guildId: message.guild.id });
      await query.findOne(function (err, guild) {
        if (err)
          return handleError(err);
        if (guild) {
          var reactionRoles = guild.get('reactionRoles');
          for(var i in reactionRoles)
          {
            var reactionQuery = ReactionRoles.where({ ReactionRoleId: reactionRoles[i]});
             reactionQuery.findOne(function (err, reaction) {
              if (err)
              return handleError(err);
              if (reaction) {
                const listEmbed = new Discord.MessageEmbed()
                .setColor("bf3f3f")
                .addField(`Reaction ID: ${reaction.ReactionRoleId}`, `Emoji: ${reaction.EmojiId}\nMessage ID: ${reaction.MessageId}\nChannel: <#${reaction.Channel}>\nType: ${reaction.ReactType}\nRole: <@&${reaction.Roles}>\nDirect Link: [Click here](https://discord.com/channels/${reaction.GuildId}/${reaction.Channel}/${reaction.MessageId})`);
                message.channel.send(listEmbed);
              }
            })
          }
        }
      });
    }
    catch{
      console.error();
    }
    

    

  }
}
