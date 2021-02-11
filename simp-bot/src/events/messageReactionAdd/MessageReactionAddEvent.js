const BaseEvent = require('../../utils/structures/BaseEvent');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');

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
    const messageObject = reaction.message;
    const query = ReactionRoles.where({ MessageId: messageObject.id, EmojiId: reaction.emoji });
    await query.findOne(function (err, reactionMessage) {
        if (err) {
            return handleError(err);
        }
        if(reactionMessage) {
            var member = reaction.message.guild.member(user.id);
            
            return member.roles.add(reactionMessage.Roles);
            
        }
        return;
    });
  }
}