const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when new member joins
 * @version 4.3.7
 */

module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }
  async run (client, message) {
    console.log(`${message.id} was deleted!`);
  // Partial messages do not contain any content so skip them
  if (!message.partial) {
    console.log(`It had content: "${message.content}"`);
  }
  }
}