const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ResumeCommand extends BaseCommand {
  constructor() {
    super('resume', 'user', []);
  }

  run(client, message, args) {
    const queue = MusicQueue;

    const server_queue = queue.get(message.guild.id);
    if(!server_queue){
      return message.channel.send("There are no songs in queue");
    }
    server_queue.connection.dispatcher.resume();
  }
}