const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

/**
 * Used to update the GuildConfig database for any guilds already initialized
 * @version 4.2.0
 */

module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setPrefix', 'admin', []);
  }

  async run(client, message, args) {
    if (!args[0]) {
      message.channel.send("You need to provide more info!");
    } else {
      
      try{
      const newPrefix = args[0];

      const guildObject = message.guild;
      const query = await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, {prefix: newPrefix});
      message.channel.send(`Prefix changed! New prefix: ${args[0]}`);
    } catch (err) {
      message.channel.send('An Error has occured! I cannot Complete this action.');
      console.log(err);
    }
    }
  }
}