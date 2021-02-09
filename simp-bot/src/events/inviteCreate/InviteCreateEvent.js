const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when invite link is created
 * @version 4.3.5
 * 
 * info that will persist: code, channel, and url
 */

module.exports = class InviteCreateEvent extends BaseEvent {
  constructor() {
    super('inviteCreate');
  }
  async run (client, invite) {
    await addInviteToArray(invite);
  }
}

async function addInviteToArray(invite) {
  console.log('Server Invite has been created.');
  //console.log(`Invite: ${invite}`);
  const guildObject = invite.guild;


  var invObject = { code: invite.code, uses: invite.uses, roles: null};


  //This will add the invite link to the database
  try {
    const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id }, { $push: { inviteLinks: invObject } });
    console.log(`Invite added to inviteLinks: ${invite}`);
  }
  catch (err) {
    console.log(err);
  }
}
