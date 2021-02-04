const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/GuildConfig');

/**
 * Used to update the GuildConfig database for any guilds already initialized
 * @version 4.2.0
 */

module.exports = class UpdateGuildCommand extends BaseCommand {
  constructor() {
    super('updateGuild', 'developer', []);
  }

  async run(client, message, args) {
    try{
      const guildObject = message.guild;
      const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, {guildName: message.guild.name});
      console.log(`Server name added to database: ${message.guild.name}`);
    }
    catch (err) {
      console.log(err);
    }
  }
}