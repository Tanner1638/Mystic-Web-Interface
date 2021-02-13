const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when user reacts to a message.
 * @version 4.4.1
 */

module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  async run (client, reaction, user) {
    if(user.bot) return;


    const message = reaction.message;
    const emoji = reaction.emoji.toString();
    
    var server = guildCache.get(message.guild.id);
    if(server == undefined){
      
      const query = GuildConfig.where({ guildId: message.guild.id});
      await query.findOne(function (err, guild) {
        if (err) {
            return handleError(err);
        }

        if(guild) {
          server = guildCache.set(message.guild.id, guild, 300);

          removeRole(guild, emoji, message, user);
        }
      });
      return;
    }

    removeRole(server, emoji, message, user);
  }
}


function removeRole(server, emoji, message, user) {
  const reactionRoles = server.reactionRoles;
  for (var i in reactionRoles) {
    if (reactionRoles[i].emojiId == emoji && reactionRoles[i].messageId == message.id) {
      const member = message.guild.member(user.id);
      member.roles.remove(reactionRoles[i].role);
    }
  }
}