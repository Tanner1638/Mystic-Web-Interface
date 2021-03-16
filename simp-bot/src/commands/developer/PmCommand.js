const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PmCommand extends BaseCommand {
  constructor() {
    super('pm', 'developer', []);
  }

  run(client, message, args) {
    //message.channel.send('pm command works');
    message.author.send("tiddy bish")
  }
};