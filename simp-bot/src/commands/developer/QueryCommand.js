const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');


module.exports = class QueryCommand extends BaseCommand {
  constructor() {
    super('query', 'developer', []);
  }

  async run(client, message, args) {
    //console.time('QueryCommand.js');
    switch (args[0]) {
      case '1':
        await printGuildConfig(message);
        break;

      case '2':
        getInvites(message);
        break;

      case '3':
        test(message);
        break;
    }

    

    
    //console.timeEnd('QueryCommand.js');
  }
}

function getInvites(message) {
  message.guild.fetchInvites()
    .then(invites => {
      console.log(`Fetched ${invites.size} invites`);

      invites.forEach(invite => {
        console.log(invite.code);
        console.log(`Code: ${invite.code} | Uses: ${invite.uses}`);
      });
    })
    .catch(console.error);
}

async function printGuildConfig(message) {
  const guildObject = message.guild;
  const query = GuildConfig.where({ guildId: guildObject.id });
  await query.findOne(function (err, guild) {
    if (err)
      return handleError(err);
    if (guild) {
      console.log(guild.inviteLinks);
      for(invite in guild.inviteLinks){
        console.log(invite.code);
      }
    }
  });
}


function test(message) {
  //call to discord API for guild invites

  /**
   * 1. fetch all guild invites
   * 2. for each fetched guild invite, find the databaseLink with the same code
   * 3. compare the values between the fetched invite uses and databaseLink uses
   * 4. Afterwards //Perform role assigning code
   * 5. update databaseLink uses to the new current.
   */





  message.guild.fetchInvites()
    .then(async invites => {

      const guildObject = message.guild;
      const query = GuildConfig.where({ guildId: guildObject.id });
      
      /**
       * Potentially error prone? will this wait until a task is complete? if theres no change in uses?
       */
      await query.findOne(function (err, guild) {
        if (err)
            return handleError(err);

        if (guild) {
          var inviteLinks = guild.inviteLinks;

          invites.forEach(async invite => {
            
            for(var i in inviteLinks){
              if(inviteLinks[i].code == invite.code){
                console.log(`We have a match: ${invite.code}`);
                console.log(`Database Uses: ${inviteLinks[i].uses}`);
                console.log(`Fetched Uses: ${invite.uses}`);
                if(inviteLinks[i].uses != invite.uses){
                  console.log(`\n\n Invite ${invite.code} has been used.`)
                  await GuildConfig.findOneAndUpdate({ guildId: guildObject.id},
                    { $set: {inviteLinks: {code: invite.code, uses: invite.uses}
                  }});
                }
                else{
                  console.log('No change.');
                }
              }
            }
          });
        }
      });
    })
    .catch(console.error);
    //console.timeEnd('QueryCommand.js');
}