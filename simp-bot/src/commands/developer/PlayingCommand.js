const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * allows developer to set what the bot is playing
 * @version 4.3.2
 */

module.exports = class PlayingCommand extends BaseCommand {
  constructor() {
    super('playing', 'developer', []);
  }

  run(client, message, args) {
    let playArg = args.slice(0).join(" ");
      client.user.setActivity(playArg);
  }
}