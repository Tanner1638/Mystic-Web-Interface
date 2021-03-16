const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class DebugCommand extends BaseCommand {
  constructor() {
    super('devmode', 'developer', []);
  }

  run(client, message, args) {
    message.channel.send("Setting Bot to developer mode.");
    clientCache.set("debug", true);

  }
};