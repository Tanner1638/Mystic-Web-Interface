const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TiddyCommand extends BaseCommand {
  constructor() {
    super('tiddy', 'user', []);
  }

  run(client, message, args) {
    message.channel.send('tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy tiddy ');
  }
}