const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * allows developer to change the username of the bot
 * @version 4.3.6
 */

module.exports = class SetStatusCommand extends BaseCommand {
  constructor() {
    super('setBotUsername', 'developer', []);
  }

  run(client, message, args) {
    client.user.setUsername(args[0])
    .then(console.log(`My new username is ${client.user.username}`))
    .catch(console.error);
  }
}