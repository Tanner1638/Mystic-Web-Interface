const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

module.exports = class QueryCommand extends BaseCommand {
  constructor() {
    super('query', 'developer', []);
  }

  async run(client, message, args) {
    switch (args[0]) {
      case '1':
        await printGuildConfig(message);
        break;

      case '2':
        getInvites(message);
        break;
    }
    

    
    
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
