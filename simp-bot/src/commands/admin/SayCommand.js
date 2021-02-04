const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'admin', []);
  }

  async run(client, message, args) {

    await message.channel.bulkDelete(1);
    var newMessage = "";
    for (var i in args){
      newMessage += ' '+args[i];
    }
    message.channel.send(newMessage);
  }
}