const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockchannelCommand extends BaseCommand {
  constructor() {
    super('lockchannel', 'admin', ["lc"]);
  }

  run(client, message, args) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No.");
    var guild = guildCache.get(message.guild.id)
    
    
  }
}