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
    
    var apiInvites = {};
    var guildInvites = {};
    member.guild.fetchInvites()
    .then(async invites => {
      
      const guildObject = member.guild;
      const query = GuildConfig.where({ guildId: guildObject.id });
      await query.findOne(async function (err, guild) {
        if (err)
            return handleError(err);
        if (guild) {
          guildCache.set(member.guild.id, guild, 1200);
          member.roles.add(guild.defaultRole).catch(console.error);
          var inviteLinks = guild.inviteLinks;

          guild.inviteLinks.forEach(invite =>{
            var guildInviteObject = {uses: invite.uses, role: invite.roles}
            guildInvites[invite.code] = guildInviteObject;
          })

          invites.forEach(async invite => {
            apiInvites[invite.code] = invite.uses;

          });

          for  (var apiInvite in apiInvites){
            if (guildInvites[apiInvite].uses != apiInvites[apiInvite]){

              await GuildConfig.updateOne({ guildId: guildObject.id, 'inviteLinks.code': apiInvite},
                    { $set: {'inviteLinks.$.uses': apiInvites[apiInvite]}
                  });
              if(guildInvites[apiInvite].role){
                member.roles.add(guildInvites[apiInvite].role).catch(console.error);
              }
              return;
            }
            
          }
        }
      });
    })
    .finally( async () => {
      for( var code in guildInvites){
        if(!apiInvites.hasOwnProperty(code)){
          const query = await GuildConfig.findOneAndUpdate({ guildId: member.guild.id}, { $pull: {inviteLinks: {code: code}}});
        }
      }
    })
    .catch(console.error);
  }
}