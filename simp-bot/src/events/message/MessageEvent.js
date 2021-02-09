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
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        message.channel.startTyping();
        if(command.category == "developer" && message.member.id != '542483559500218389'){
          message.channel.bulkDelete(1);
          message.reply("this is a developer command ;)")
          .then(message => {
            message.delete({ timeout: 5000});
          })
          .catch(err => {
            throw err
          });
          return;
        }
        
        command.run(client, message, cmdArgs);
        message.channel.stopTyping();
      }
    }
  }
}