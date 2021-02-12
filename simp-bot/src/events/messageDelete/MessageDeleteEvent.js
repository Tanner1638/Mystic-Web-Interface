const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
//const  ReactionRoles  = require('../../database/schemas/ReactionRoles');

/**
 * initiates when new member joins
 * @version 4.3.7
 */

module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }
  async run (client, message) {


    //This will remove the invite link to the database
    try {
        await GuildConfig.findOneAndUpdate({ guildId: message.guild.id}, { $pull: {reactionRoles: {messageId: message.id}}});
    }
    catch (err) {
        console.log(err);
    }


  
  if (!message.partial) {
    //console.log(`It had content: "${message.content}"`);
  }
  }
}