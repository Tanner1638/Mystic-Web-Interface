const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

/**
 * this command will allow a server admin to specify a role to give based off an existing invite link.
 * @version 4.3.7
 * 
 * needs to retrieve: role, inviteURL or code
 * @TODO #77
 */

module.exports = class InviteRoleCommand extends BaseCommand {
  constructor() {
    super('inviterole', 'admin', ["ir"]);
  }

  async run(client, message, args) {
    var Permissions = message.member.permissions;
    if(!Permissions.has('MANAGE_ROLES')) {
      message.channel.bulkDelete(1);
      message.reply("you dont have permissions to complete this action.")
      .then(message => {
        message.delete({ timeout: 3000});
      })
      .catch(err => {
        throw err
      });
      return;
    }

    var commandName = 'inviteRole';

    if (!args[1]){
      message.channel.bulkDelete(1);
      var info = new Discord.MessageEmbed()
      .setTitle("Invite Role - Help")
      .setColor("bf3f3f")
      .setFooter("- Make sure to use your own invite code otherwise it wont work!")
      .setDescription(
        `Link a role to give when a user joins off a specific invite link!\n
        To do this, type the command followed by either @tagging or writing the name of the role you want to give. Then insert either the invite URL or the invite code.\n
        !inviteRole [ROLE] [INVITE]`
      )
      .addField(`Examples:`,  `!inviteRole @RoleToGive <https://discord.gg/M7jjUACQ>\n!inviteRole @RoleToGive M7jjUACQ\n!inviteRole RoleToGive M7jjUACQ\n!inviteRole RoleToGive <https://discord.gg/M7jjUACQ>`);
      return message.channel.send(info);
    }

    var initialRole = args[0];
    var inviteCode = args[1];
    var roleId = '';


    //Assign roleObject variable and trim roleId
    if (initialRole.startsWith('<@')) {
      roleId = initialRole.slice(3, initialRole.length - 1);
      var roleObject = message.guild.roles.cache.get(roleId);
    } else {
      var roleObject = message.guild.roles.cache.find(role => role.name.toLowerCase() == initialRole.toLowerCase());
      if (!roleObject) return message.reply("I couldn't find that role! Did you spell it right?");
      roleId = roleObject.id;
    }

    // Trim the invite URL if it hasnt been done already.
    if (inviteCode.startsWith('https://discord.gg/')) {
      inviteCode = inviteCode.slice(19);
    }

    // Check if role & invite exists
    var passCheck = true;
    const guildObject = message.guild;
    const query = GuildConfig.where({
      guildId: guildObject.id,
      'inviteLinks.code': inviteCode
    });

    await query.findOne(function (err, guild) {
      if (err) return handleError(err);
      if (!guild) {
        passCheck = false;
        return message.reply("I coudn't find that invite! Does it exist?");
      }
    });
    if (passCheck) {
      await GuildConfig.updateOne({
        guildId: guildObject.id,
        'inviteLinks.code': inviteCode
      }, {
        $set: {
          'inviteLinks.$.roles': roleId
        }
      })
      message.channel.send(`Role: ${roleObject.name} is now linked to invite code: ${inviteCode}`);
    }
    //console.timeEnd('InviteRole Command');
  }
}