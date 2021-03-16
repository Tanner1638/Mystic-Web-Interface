const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class FuckingfuckCommand extends BaseCommand {
  constructor() {
    super('fuckingfuck', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('fuckingfuck command works');
  }
}