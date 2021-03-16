const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
  constructor() {
    super('leave', 'user', ["stop"]);
  }

  async run(client, message, args) {
    const voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command");
    await voiceChannel.leave();
    await message.channel.send("Leaving channel");
    voiceChannel.leave();
    const queue = MusicQueue;
    queue.delete(message.guild.id);

  }
}