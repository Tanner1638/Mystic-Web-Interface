const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * allows developer to set what the bot is listening to.
 * @version 4.3.1
 */

module.exports = class ListeningToCommand extends BaseCommand {
  constructor() {
    super('listeningto', 'developer', []);
  }

  run(client, message, args) {
    let lstArg = args.slice(0).join(" ");
      client.user.setActivity(lstArg, {
        type: "LISTENING"
      }).catch(console.error);
  }
}