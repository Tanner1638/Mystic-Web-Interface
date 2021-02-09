const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/GuildConfig');

/**
 * this command will allow a server admin to specify a role to give based off an existing invite link.
 * @version 4.3.7
 * 
 * needs to retrieve: role, inviteURL or code
 */

module.exports = class AssignRoleByInviteCommand extends BaseCommand {
  constructor() {
    super('assignInviteRole', 'admin', ["assigninviterole"]);
  }

  async run(client, message, args) {

    var Permissions = message.member.permissions;
    if(!Permissions.has('MANAGE_ROLES')) {
      message.channel.bulkDelete(1);
      message.reply("you dont have permissions to complete this action.")
      .then(message => {
        message.delete({ timeout: 5000});
      })
      .catch(err => {
        throw err
      });
      return;
    }

    var commandName = 'assignInviteRole';

    if (!args[1]) return message.reply(`You must provide a role and a invite URL or code to perform this action.\n\n**Examples**:\n!${commandName} @member <http://discord.gg//INVITECODE>\n!${commandName} member INVITECODE`);

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
  }
}