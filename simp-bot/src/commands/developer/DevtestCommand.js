const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class DevtestCommand extends BaseCommand {
  constructor() {
    super('devtest', 'developer', []);
  }

  run(client, message, args) {
    message.channel.send('devtest command works');
  }
}