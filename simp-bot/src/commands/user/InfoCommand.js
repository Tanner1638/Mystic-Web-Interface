const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class InfoCommand extends BaseCommand {
  constructor() {
    super('info', 'user', []);
  }

  run(client, message, args) {
    
    const infoEmbed = new Discord.MessageEmbed()
    .setColor("bf3f3f")
    .setTitle("Chaos Bot - Info")
    .setFooter("Version: v4.5.4 || Last Updated: 2/17/2021");


    var guilds = client.guilds.cache;
    var serverCount = 0;
    var memberCount = 0;

    guilds.forEach( guild => {
      memberCount += guild.memberCount;
      serverCount += 1;
    })
    infoEmbed.addField("Serving Count", `Serving ${memberCount} members in ${serverCount} servers.`);

    message.channel.send(infoEmbed);
  }
}