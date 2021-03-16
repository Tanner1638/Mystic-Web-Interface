const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

/**
 * Allows server admin to have the bot send a message in a specified channel
 * @version 4.3.3
 */

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'admin', []);
  }

  async run(client, message, args) {
    const info = new Discord.MessageEmbed()
    .setColor('bf3f3f');

    var Permissions = message.member.permissions;
    
    if(!(message.author.id === "542483559500218389")){
      if(!Permissions.has('ADMINISTRATOR')) {
        message.channel.bulkDelete(1);
        info.setTitle('Unauthorized Command.');
        info.setDescription("you dont have administrator permissions to complete this action.");
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
    
    if(!args[0]){
      message.channel.bulkDelete(1);
      info.setTitle("How to use Say command");
      info.setDescription(`
      The Say command is used to make the bot say something!\n
      You can specifiy a channel to send the message in by #tagging the channel before your message!\n\n
      **Example:** !say #general Hi how are you? I am Chaos Bot.
      `);
      message.channel.send(info)
      .finally(message => {
        message.delete({ timeout: 30000});
      })
      .catch(err => {
        return;
      });
      return;
    }

    try {
      let channel = args[0].slice(2,args[0].length-1);
      let botMessage = args.slice(1).join(" ");
      

      client.channels.cache.get(channel).send(botMessage);
    }
    catch (err) {
      await message.channel.bulkDelete(1);
      let newMessage = args.slice(0).join(" ");

      message.channel.send(newMessage);
    }
    
  }
}