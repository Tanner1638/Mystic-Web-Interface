const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * initiates when new member joins
 * @version 4.3.5
 * 
 * when an invite link is created, an initial value of uses of 0 is defined. When an invite link is used this value is increased.
 * search in database comparison between original link value and the one that increased.
 */

module.exports = class InviteCreateEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  async run (client, member) {
    console.log('A new member has joined!');
    console.log(`Member: ${member}`);



    

    ///const guildObject = member.guild;
    
  }
}

function getInvites(message) {
    message.guild.fetchInvites()
      .then(invites => {
        console.log(`Fetched ${invites.size} invites`);
  
        invites.forEach(invite => {
          console.log(`Code: ${invite} | Uses: ${invite.uses}`);
        });
      })
      .catch(console.error);
  }