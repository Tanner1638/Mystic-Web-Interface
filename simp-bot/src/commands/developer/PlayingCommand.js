const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayingCommand extends BaseCommand {
  constructor() {
    super('playing', 'developer', []);
  }

  run(client, message, args) {
    message.channel.send('playing command works');
  }
}