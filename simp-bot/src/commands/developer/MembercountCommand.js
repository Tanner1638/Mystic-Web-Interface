const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MembercountCommand extends BaseCommand {
  constructor() {
    super('membercount', 'developer', ["mc"]);
  }

  run(client, message, args) {
    //message.channel.send('membercount command works');
    //console.log(client.guilds)
    var guilds = client.guilds.cache;
    var serverCount = 0;
    var memberCount = 0;

    guilds.forEach( guild => {
      console.log(guild.memberCount);
      memberCount += guild.memberCount;
      serverCount += 1;
    })

    console.log(`Server Count: ${serverCount}\nMember Count: ${memberCount}`);
  }
};