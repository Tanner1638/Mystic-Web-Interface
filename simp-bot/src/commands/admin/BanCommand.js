const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * bans a member & provides a reason
 * @version 4.2.3
 */

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'admin', []);
  }

  run(client, message, args) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have ban member permissions!");
    
    if(!args[0]) return message.reply("You must @mention a user to ban.")
    let User = message.guild.member(message.mentions.users.first());
    let banReason = args.join(" ").slice(22);
    
    if(!User) return message.reply("Invalid user");
    if(!banReason) {
      banReason = "None";
    }
    
    User.ban({ reason: banReason });
  }
}