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
    Most of the commands will better instruct you on how to use them if you don't give any following arguments (AKA just say the command)
    
    **__User Commands__**
    **${prefix}help** Displays this message!
    **${prefix}dashboard** - Sends an embed with a link straight to the dashboard!
    **${prefix}info** - View bot stats!

    **__Music Commands__**
    **${prefix}play** - Play music through youtube!
    **${prefix}stop** - Clears music queue and leaves channel
    **${prefix}skip** - Skips currently playing song
    **${prefix}resume** - Continues playing song
    **${prefix}pause** - Pauses currently playing song

    **:red_square: __ADMIN COMMANDS__ :red_square:**
    **${prefix}setPrefix** | **${prefix}sp** - change the servers prefix

    **${prefix}kick** - Kick a user
    **${prefix}ban** - Ban a user, optional to provide a reason [reason will show up in the audit log]

    **${prefix}purge** - Bulk delete messages (1 - 99)
    **${prefix}say** - make the bot say something! Specifiy a channel to send the message to another channel.
    **${prefix}createEmbed  | ${prefix}ce** - Create a custom embed on the fly!

    **__[ SERVER CONFIGURATIONS ]__**

    **__Reaction Roles__**
    **${prefix}reactionRole** | **${prefix}rr** - Make reaction roles! Users can react to an emoji and receive a role!
    **${prefix}listReactions** | **${prefix}lr** - Lists all reaction roles setup.
    **${prefix}removeRole** | **${prefix}rrr** - Remove an active reaction role

    **__Default Roles__**
    **${prefix}addDefaultRole | ${prefix}adr** - Add default roles for members to receive when they join the server
    **${prefix}removeDefaultRole | ${prefix}rdr** - Remove default roles for members to receive when they join the server
    **${prefix}listDefaultRoles | ${prefix}ldr** - Lists default roles for server

    **${prefix}inviteRole** | **${prefix}ir** - Link a role for users to be given upon joining a specific invite link
    
    **__Voice Chat Commands__**
    **${prefix}moveMember** - Moves specific member from one voice channel to specified voice channel
    **${prefix}moveAll  | ${prefix}mall** - Moves all memebers in voice channel to specified voice channel

    

    
    `);
    
    message.channel.send(exampleEmbed);
  }
}

    