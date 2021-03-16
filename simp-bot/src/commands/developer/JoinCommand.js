const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
  constructor() {
    super('join', 'developer', []);
  }

  run(client, message, args) {
    
    const voiceChannel = message.member.voice.channel;
    voiceChannel.join()
  }
};