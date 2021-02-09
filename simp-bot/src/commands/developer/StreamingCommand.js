const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class StreamingCommand extends BaseCommand {
  constructor() {
    super('streaming', 'developer', []);
  }

  run(client, message, args) {
    let streamArg = args.slice(0).join(" ");
      client.user.setActivity(streamArg, {
        type: "STREAMING",
        url: "https://www.twitch.tv/zvmysticvz"
      }).catch(console.error);
  }
}