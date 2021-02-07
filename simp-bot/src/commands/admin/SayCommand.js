const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * Allows server admin to have the bot send a message in a specified channel
 * @version 4.3.3
 */

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'admin', []);
  }

  async run(client, message, args) {
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