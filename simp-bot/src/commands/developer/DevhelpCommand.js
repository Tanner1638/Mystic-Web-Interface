const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class DevhelpCommand extends BaseCommand {
  constructor() {
    super('devhelp', 'developer', []);
  }

  run(client, message, args) {
    const prefix = guildCache.get(message.guild.id).prefix;

    
    const info1 = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
    .setTitle("Chaos Bot Commands")
    .setDescription(`
    Most of the commands will better instruct you on how to use them if you don't give any following arguments (AKA just say the command)\n
    **${prefix}help** Displays this message!\n
    **${prefix}play** - Play music through youtube!\n
    **${prefix}stop** - Clears music queue and leaves channel\n
    **${prefix}skip** - Skips currently playing song\n
    **${prefix}resume** - Continues playing song \n
    **${prefix}pause** - Pauses currently playing song\n
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
    **${prefix}moveMember** - Moves specific member from one voice channel to specified voice channel\n
    **${prefix}moveAll  | ${prefix}mall** - Moves all memebers in voice channel to specified voice channel\n
    **${prefix}createEmbed  | ${prefix}ce** - Create a custom embed on the fly!\n
    `);
    const info2 = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setDescription(`
    **[ DEVELOPER COMMANDS ]**\n
    **${prefix}debug** - Stops bot from accepting commands\n
    **--exit** - Returns bot to accepting commands\n
    **${prefix}join** - Makes Chaos bot join voice channel\n
    **${prefix}leave** - Makes Chaos bot leave voice channel\n
    **${prefix}listeningTo** - Sets Chaos bot's status to "Listening to [args]\n
    **${prefix}playing** - Sets Chaos bot's status to "Playing [args]\n
    **${prefix}watching** - Sets Chaos bot's status to "Watching [args]\n
    **${prefix}streaming** - Sets Chaos bot's status to "Streaming Mystic's Twitch\n
    **${prefix}memberCount** - Sends Embed of memberCount\n
    **${prefix}ping** - Returns response time info\n
    **${prefix}test** - Sends a message if bot is working\n
    **${prefix}waifuTracker | ${prefix}wt** - Set Waifu Tracker to true or false\n
    **${prefix}initGuild** - Initialize a guild if not done previously\n
    `);
    
    message.channel.send(info1);
    message.channel.send(info2);
  }
};