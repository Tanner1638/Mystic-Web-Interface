const BaseEvent = require('../../utils/structures/BaseEvent');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');

/**
 * initiates when user reacts to a message.
 * @version 4.4.1
 */

module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  async run (client, reaction, user) {

    const messageObject = reaction.message;
    const query = ReactionRoles.where({ MessageId: messageObject.id, EmojiId: reaction.emoji });
    await query.findOne(function (err, reactionMessage) {
        if (err) {
            return handleError(err);
        }
        if(reactionMessage) {
            var member = reaction.message.guild.member(user.id);
            member.roles.remove(reactionMessage.Roles);
        }
    })
  }
}