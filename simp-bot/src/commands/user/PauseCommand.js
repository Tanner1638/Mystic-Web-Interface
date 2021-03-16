const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PauseCommand extends BaseCommand {
  constructor() {
    super('pause', 'user', []);
  }

  run(client, message, args) {
    const queue = MusicQueue;

    const server_queue = queue.get(message.guild.id);
    if(!server_queue){
      return message.channel.send("There are no songs in queue");
    }
    server_queue.connection.dispatcher.pause();
    message.channel.send("Music Paused!")
  }
}