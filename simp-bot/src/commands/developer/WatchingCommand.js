const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class WatchingCommand extends BaseCommand {
  constructor() {
    super('watching', 'developer', []);
  }

  run(client, message, args) {
    let watchingArg = args.slice(0).join(" ");
      client.user.setActivity(watchingArg, {
        type: "WATCHING"
      }).catch(console.error);
  }
}