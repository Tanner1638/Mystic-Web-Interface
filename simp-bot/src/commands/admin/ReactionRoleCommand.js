const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ReactionRoleCommand extends BaseCommand {
  constructor() {
    super('reactionRole', 'admin', ["rr"]);
  }

  run(client, message, args) {
    message.channel.send('reactionRole command works');
  }
}