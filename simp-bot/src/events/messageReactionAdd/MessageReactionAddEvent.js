const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when user reacts to a message.
 * @version 4.4.1
 */

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  async run (client, reaction, user) {
    if(user.bot) return;


    const message = reaction.message;
    var emji = reaction.emoji

    var emoji = emji.toString();
    

    const query = GuildConfig.where({ guildId: message.guild.id});
    await query.findOne(function (err, guild) {
        if (err) {
            return handleError(err);
        }

        if(guild) {
          var reactionRoles = guild.reactionRoles;
          for(var i in reactionRoles){
            if(reactionRoles[i].emojiId == emoji && reactionRoles[i].messageId == message.id){

              var member = reaction.message.guild.member(user.id);
              member.roles.add(reactionRoles[i].role);
            }
          }
        }
        return;
    });
  }
}