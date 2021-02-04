const BaseCommand = require('../../utils/structures/BaseCommand');
//const mongoose = require('mongoose');
//const GuildConfig = require('../../database/schemas/GuildConfig');
//const User = require('../../database/schemas/User');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send('Test command works wondereful!');
  }
}