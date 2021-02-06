const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayingCommand extends BaseCommand {
  constructor() {
    super('playing', 'developer', []);
  }

  run(client, message, args) {
    let playArg = args.slice(0).join(" ");
      client.user.setActivity(playArg);
  }
}