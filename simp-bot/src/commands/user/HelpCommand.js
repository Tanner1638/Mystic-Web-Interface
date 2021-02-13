const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * if no following arguments: replies with an embed of the different catagories of commands
 * otherwise: replies with an embed of commands related to the catagory specified.
 * @version 4.2.2
 */

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'user', []);
  }


  run(client, message, args) {

    const prefix = guildCache.get(message.guild.id).prefix;

    
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
    .setTitle("Chaos Bot Commands")
    .setDescription(`
    Most of the commands will better instruct you on how to use them if you don't give any following arguments (AKA just say the command)\n
    **${prefix}help** Displays this message!\n
    **[ ADMIN COMMANDS ]**\n
    **${prefix}setPrefix** | **${prefix}sp** - change the servers prefix\n
    **${prefix}kick** - Kick a user\n
    **${prefix}ban** - Ban a user, optional to provide a reason [reason will show up in the audit log]\n
    **${prefix}say** - make the bot say something! Specifiy a channel to send the message to another channel.\n
    **${prefix}purge** - Bulk delete messages (1 - 99)\n
    **${prefix}inviteRole** | **${prefix}ir** - Link a role for users to be given upon joining a specific invite link\n
    **${prefix}reactionRole** | **${prefix}rr** - Make reaction roles! Users can react to an emoji and receive a role!\n
    **${prefix}listReactions** | **${prefix}lr** - Lists all reaction roles setup.\n
    **${prefix}removeRole** | **${prefix}rrr** - Remove an active reaction role\n
    **${prefix}dashboard** - Sends an embed with a link straight to the dashboard!\n
    `);
    
    message.channel.send(exampleEmbed);
  }
}

    