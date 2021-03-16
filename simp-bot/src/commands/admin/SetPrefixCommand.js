const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');
const NodeCache = require( "node-cache" );

/**
 * Used to update the GuildConfig database for any guilds already initialized
 * @version 4.2.0
 */

module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setprefix', 'admin', ["sp"]);
  }

  async run(client, message, args) {

    if(!(message.author.id === "542483559500218389")){
      if(!message.member.permissions.has('ADMINISTRATOR')) {
        message.channel.bulkDelete(1);
        message.reply("you dont have permissions to manage the bot settings.")
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }
    

    const info = new Discord.MessageEmbed()
      .setColor("bf3f3f")

    if (!args[0]) {
      var guild = guildCache.get(message.guild.id);
      var prefix = guild.prefix;
      info.setTitle("How To Set Prefix")
      info.setDescription(`
      Say ${prefix}setPrefix or ${prefix}sp followed by the prefix youd like to set the bot prefix to!\n
      **Examples:**\n
      ${prefix}setPrefix **-**\n
      ${prefix}setPrefix **bot!**\n\n
      -------Commands After Prefix Change-------\n
      **${prefix}setPrefix -** --> -help, -kick, -ban, -say...\n
      **${prefix}setPrefix bot!** --> bot!help, bot!kick, bot!ban, bot!say...\n
      `)

      message.channel.send(info);
    } else {
      
      try{
      const newPrefix = args[0];

      const guildObject = message.guild;
      const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, {prefix: newPrefix});
      info.setTitle("Prefix Changed!")
      info.setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
      info.setDescription(`
      The new prefix is: ${newPrefix}\n\n
      Examples:
      ${newPrefix}help, ${newPrefix}kick, ${newPrefix}ban, ${newPrefix}say, etc...
      `);

      //prefixCache.set(message.guild.id, newPrefix);
      guildCache.del(message.guild.id);
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