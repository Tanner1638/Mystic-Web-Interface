const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * allows admin to kick members from Discord server
 * @version 4.2.3
 */

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'admin', []);
  }

  run(client, message, args) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
      let User = message.guild.member(message.mentions.users.first())
      
      if(!User) return message.channel.send("Invalid user");
      User.kick();
    }
    else {
      message.reply("You do not have kick members permission.")
    }
  }
}