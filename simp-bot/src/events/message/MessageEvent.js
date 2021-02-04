const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
//const React = require('react');
//const useQuery = require('@apollo/client');


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if (message.guild.id != 783496949427863563) return;
    console.log(`${message.author.username}: ${message.content}`);

    


    var prefix = "!";

    const guildObject = message.guild;
    const query = GuildConfig.where({ guildId: guildObject.id});
    await query.findOne(function (err, guild) {
      if (err) return handleError(err);
      if(guild){
        prefix = guild.get('prefix');
      }
    });

    
    if (message.content.startsWith(prefix)) {
      console.log("\n---Message starts with prefix. Continuing---\n");
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}