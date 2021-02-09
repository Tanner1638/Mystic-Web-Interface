const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when new member joins
 * @version 4.3.7
 * 
 * @TODO #56
 */

module.exports = class InviteCreateEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  async run (client, member) {
    member.guild.fetchInvites()
    .then(async invites => {
      const guildObject = member.guild;
      const query = GuildConfig.where({ guildId: guildObject.id });
      await query.findOne(function (err, guild) {
        if (err)
            return handleError(err);
        if (guild) {
          var inviteLinks = guild.inviteLinks;
          
          invites.forEach(async invite => {
            for(var i in inviteLinks){
              if(inviteLinks[i].code == invite.code){
                if(inviteLinks[i].uses != invite.uses){
                  await GuildConfig.updateOne({ guildId: guildObject.id, 'inviteLinks.code': invite.code},
                    { $set: {'inviteLinks.$.uses': invite.uses}
                  });
                  if(inviteLinks[i].roles){
                    member.roles.add(inviteLinks[i].roles).catch(console.error);
                  }
                  return;
                }
              }
            }
          });
        }
      });
    })
    .catch(console.error);
  }
}