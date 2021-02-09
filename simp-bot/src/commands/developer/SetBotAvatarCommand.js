const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * allows developer to change the avatar of the bot
 * @version 4.3.6
 */

module.exports = class SetBotAvatarCommand extends BaseCommand {
  constructor() {
    super('setBotAvatar', 'developer', []);
  }

  run(client, message, args) {
    client.user.setAvatar('https://i.ibb.co/rs5GQKh/Wolf-Complete-Backup-1.png')
    .then(user => console.log('New avatar set!'))
    .catch(console.error);
  }
}