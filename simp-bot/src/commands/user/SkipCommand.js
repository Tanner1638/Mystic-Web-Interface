const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'user', []);
  }

  run(client, message, args) {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to execute this command");
    const queue = MusicQueue;

    const server_queue = queue.get(message.guild.id);
    if(!server_queue){
      return message.channel.send("There are no songs in queue");
    }
    server_queue.connection.dispatcher.end();
  }
}