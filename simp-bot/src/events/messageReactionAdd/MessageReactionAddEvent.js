const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

const NodeCache = require( "node-cache" );


/**
 * initiates when user reacts to a message.
 * @version 4.4.1
 */

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  async run (client, reaction, user) {
    if(user.bot) {
      return;
    }
    
    guildCache.del(reaction.message.guild.id);

    const message = reaction.message;
    const emoji = reaction.emoji.toString();
    
    var server = guildCache.get(message.guild.id);
    if(server === undefined){
      
      const query = GuildConfig.where({ guildId: message.guild.id});
      await query.findOne(function (err, guild) {
        if (err) {
            return handleError(err);
        }

        if(guild) {
          server = guildCache.set(message.guild.id, guild, 300);

          addRole(guild, emoji, message, user);
        }
      });
      
      return;
    }

    addRole(server, emoji, message, user);
  }
}


function addRole(server, emoji, message, user) {
  const reactionRoles = server.reactionRoles;
  for (var i in reactionRoles) {
    if (reactionRoles[i].emojiId === emoji && reactionRoles[i].messageId === message.id && (reactionRoles[i].type === 1 || reactionRoles[i].type === 2)) {
      const member = message.guild.member(user.id);
      member.roles.add(reactionRoles[i].role);
    }
  }
}