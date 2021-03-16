const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

module.exports = class RemovedefaultroleCommand extends BaseCommand {
  constructor() {
    super('removedefaultrole', 'admin', ["rdr"]);
  }

  async run(client, message, args) {
    const info = new Discord.MessageEmbed()
    .setColor("bf3f3f");
    
    var Permissions = message.member.permissions;
    if(!(message.author.id === "542483559500218389")){
      if(!Permissions.has('MANAGE_ROLES')) {
        message.channel.bulkDelete(1);
        info.setTitle('Unauthorized Command.');
        info.setDescription("you dont have permissions to manage roles.");
        message.channel.send(info)
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }

    if (!args[0]){
      return InfoMessage(message);
    }

    var targetRoleId = args[0];
    if (targetRoleId.startsWith('<@')) {
      targetRoleId = targetRoleId.slice(3, targetRoleId.length - 1);
      var role = message.guild.roles.cache.get(targetRoleId);
    }
    else {
      var role = message.guild.roles.cache.find(role => role.name.toLowerCase() == targetRoleId.toLowerCase());
      if (!role) return message.reply("I couldn't find that role! Did you spell it right?");
      targetRoleId = role.id;
    }

    const guildObject = message.guild;
    const query = GuildConfig.where({
      guildId: guildObject.id,
      'defaultRole': targetRoleId
    });
    await query.findOne(async function (err, guild) {
      if (err) return handleError(err);
      if (!guild) {
        message.channel.bulkDelete(1);
        message.reply(`"${role.name}" does not exist in default role.`)
        .then(message => {
          message.delete({ timeout: 10000 });
        })
        .catch(err => {
          throw err
        });
        return;
      }
      else{
        try {
          await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { $pull: { defaultRole: targetRoleId }
          });
          message.channel.bulkDelete(1);
          message.channel.send(`Role "${role.name}" has been removed from default roles.`)
          .then(message => {
            message.delete({ timeout: 10000 });
          })
          .catch(err => {
            throw err
          });
        } catch (err) {
          message.channel.send(`An error has occured! Cannot complete action.`);
          console.log(err);
        }
      }
    });
  }
}


function InfoMessage(message) {
  message.channel.bulkDelete(1);

  const prefix = guildCache.get(message.guild.id).prefix;

  var info = new Discord.MessageEmbed()
    .setTitle("Remove Default Roles - Help")
    .setColor("bf3f3f")
    .setFooter(`Note: You can use "${prefix}removeDefaultRole" or the shortcut "${prefix}rdr" for this command.`)
    .setDescription(
      `Remove roles that are assigned to members automatically when they join the server!\n
        To do this, type the command followed by either @tagging or writing the name of the role you want to remove.

        ${prefix}removeDefaultRole [ROLE]
        `
    )
    .addField(`Examples:`, `**${prefix}removeDefaultRole** @RoleName\n**${prefix}removeDefaultRole** RoleName\n`);
  return message.channel.send(info);
}