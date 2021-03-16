const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const cacheGuild = require('../../cache/cache');

module.exports = class ListdefaultrolesCommand extends BaseCommand {
  constructor() {
    super('listdefaultroles', 'admin', ["ldr"]);
  }

  async run(client, message, args) {

    await cacheGuild(message.guild.id);
    server = await guildCache.get(message.guild.id);

    const listEmbed1 = new Discord.MessageEmbed()
    .setTitle("Default Roles List")
    .setColor("bf3f3f");

    var server = guildCache.get(message.guild.id);
    var defaultRoles = server.defaultRole;
    var rolesList = "";

    for (var i in defaultRoles) {
      var rrObject = defaultRoles[i];
      rolesList += `<@&${rrObject}>\n`
    }

    listEmbed1.setDescription(rolesList);
    message.channel.send(listEmbed1);
  }
}
