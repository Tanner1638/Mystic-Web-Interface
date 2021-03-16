const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');


module.exports = class MovememberCommand extends BaseCommand {
  constructor() {
    super('movemember', 'admin', []);
  }

  run(client, message, args) {
    if(!message.author.id == "542483559500218389"){
      if(!message.member.permissions.has('MOVE_MEMBERS')) {
        message.channel.bulkDelete(1);
        message.reply("you dont have permissions to move members.")
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }

    const prefix = guildCache.get(message.guild.id).prefix;
    
    if(!args[0]){
      var server = guildCache.get(message.guild.id);
      const info = new Discord.MessageEmbed()
      .setColor("bf3f3f")
      .setTitle("Info - Move Member")
      .setDescription(`This command will move specific individuals into a different voice channel.\n**How to use:**\n ${prefix}moveMember [VC Channel ID] @UserToMove\n\nExample: ${prefix}moveMember 725896241736843294 @Chaos`)
      return message.channel.send(info);
    }
    if(!message.mentions.users.first()) {
      message.channel.send("Nobody was mentioned!");
      return;
    }
    var member = (message.mentions.users.first());

    var voiceChannel = message.guild.channels.cache.get(args[0]);

    
    message.guild.member(member).voice.setChannel(voiceChannel)
  }
}