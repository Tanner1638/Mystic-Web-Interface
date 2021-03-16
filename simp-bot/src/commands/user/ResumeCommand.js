const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ResumeCommand extends BaseCommand {
  constructor() {
    super('resume', 'user', []);
  }

  run(client, message, args) {
    const queue = MusicQueue;

    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue){
      return message.channel.send("There are no songs in queue");
    }
    serverQueue.connection.dispatcher.resume();
  }
}