const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

/**
 * Used to update the GuildConfig database for any guilds already initialized
 * @version 4.2.0
 */

module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setprefix', 'admin', ["sp"]);
  }

  async run(client, message, args) {

    if(!message.member.permissions.has('MANAGE_GUILD')) {
      message.channel.bulkDelete(1);
      message.reply("you dont have permissions to manage the server.")
      .then(message => {
        message.delete({ timeout: 5000});
      })
      .catch(err => {
        throw err
      });
      return;
    }

    if (!args[0]) {
      message.channel.send("You need to provide more info!");
    } else {
      
      try{
      const newPrefix = args[0];

      const guildObject = message.guild;
      const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, {prefix: newPrefix});
      const info = new Discord.MessageEmbed()
      .setTitle("Prefix Changed!")
      .setColor("bf3f3f")
      .setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
      .setDescription(`
      The new prefix is: ${newPrefix}\n\n
      Examples:
      ${newPrefix}help, ${newPrefix}kick, ${newPrefix}ban, ${newPrefix}say, etc...
      `);

      message.channel.send(info)
      .then(message => {
        message.member.setNickname(`𝕮𝖍𝖆𝖔𝖘 ${newPrefix}`);
      });
    } catch (err) {
      message.channel.send('An Error has occured! I cannot Complete this action.');
      console.log(err);
    }
    }
  }
}