const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RestrictchannelCommand extends BaseCommand {
  constructor() {
    super('restrictchannel', 'admin', ["rc"]);
  }

  run(client, message, args) {
    message.channel.send('restrictchannel command works');
    
  }
};