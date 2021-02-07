const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when invite link is deleted
 * @version 4.3.5
 * 
 * info that will persist: code, channel, and url
 */

module.exports = class InviteCreateEvent extends BaseEvent {
  constructor() {
    super('inviteDelete');
  }
  async run (client, invite) {
    const guildObject = invite.guild;

    //This will remove the invite link to the database
    try {
        const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, { $pull: {inviteLinks: {code: invite.code}}});
    }
    catch (err) {
        console.log(err);
    }
  }
}