const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const cacheGuild = require('../../cache/cache');

module.exports = class ListdefaultrolesCommand extends BaseCommand {
  constructor() {
    super('listdefaultroles', 'admin', ["ldr"]);
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
          throw err;
        });
        return;
      }
    }

    await cacheGuild(message.guild.id);

    const listEmbed1 = new Discord.MessageEmbed()
    .setTitle("Default Roles List")
    .setColor("bf3f3f");

    var server = guildCache.get(message.guild.id);
    var defaultRoles = server.defaultRole;
    var rolesList = "";

    defaultRoles.forEach(role => {
      rolesList += `<@&${role}>\n`;
    });

    listEmbed1.setDescription(rolesList);
    message.channel.send(listEmbed1);
  }
};