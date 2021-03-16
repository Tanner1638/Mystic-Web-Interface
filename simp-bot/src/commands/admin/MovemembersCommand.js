const { Guild } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MovemembersCommand extends BaseCommand {
  constructor() {
    super('moveall', 'admin', ['mall']);
  }

  run(client, message, args) {
    if(!(message.author.id === "542483559500218389")){
      if(!message.member.permissions.has('MOVE_MEMBERS')) {
        message.channel.bulkDelete(1);
        message.reply("you dont have permissions to move members.")
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err;
        });
        return;
      }
    }

    const prefix = guildCache.get(message.guild.id).prefix;


    if(!args[0]){
      var server = guildCache.get(message.guild.id);
      const info = new Discord.MessageEmbed()
      .setColor("bf3f3f")
      .setTitle("Info - Move All Members")
      .setDescription(`This command will move all individuals in the voice chat into a different voice channel.\n**How to use:**\n ${prefix}moveAll [VC Channel ID] \n\nExample: ${prefix}moveAll 725896241736843294`);
      return message.channel.send(info);
    }
    var voiceChannel = message.guild.channels.cache.get(args[0]);

    //MOVE_MEMBERS
    const members = message.member.voice.channel.members;
    members.forEach(member => {
      message.guild.member(member).voice.setChannel(voiceChannel);
    })
  }
}