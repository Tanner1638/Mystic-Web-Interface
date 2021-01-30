const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MoistyCommand extends BaseCommand {
  constructor() {
    super('moisty', 'fun', []);
  }

  run(client, message, args) {
    //message.channel.send('moisty command works');
    message.channel.send('https://tenor.com/view/moist-wet-juicy-ms-tight-tasty-gif-15100370');
  }
}