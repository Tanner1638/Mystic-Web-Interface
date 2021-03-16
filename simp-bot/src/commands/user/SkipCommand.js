const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'user', []);
  }

  run(client, message, args) {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to execute this command");
    const queue = MusicQueue;

    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue){
      return message.channel.send("There are no songs in queue");
    }
    serverQueue.connection.dispatcher.end();
  }
};