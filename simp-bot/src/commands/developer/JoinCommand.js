const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
  constructor() {
    super('join', 'developer', []);
  }

  run(client, message, args) {
    
    const voice_channel = message.member.voice.channel;
    voice_channel.join()
  }
}