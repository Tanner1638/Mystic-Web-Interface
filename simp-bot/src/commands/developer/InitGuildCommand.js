const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/GuildConfig');


/**
 * Used to initialize any guilds that the bot is in but is not listed in the database
 * @version 1.0.0
 */

module.exports = class InitGuildCommand extends BaseCommand {
  constructor() {
    super('initGuild', 'test', ["ig"]);
  }
  async run(client, message, args) {

    try {
      const guildConfig = await GuildConfig.create({
        guildId: message.guild.id,
        guildName: message.guild.name,
      });
  
      console.log('Bot has joined the server. Saved to DB');
      message.channel.send(`Complete!`);
    } catch (err) {
      message.channel.send(`An error has occured! Cannot complete action.`);
      console.log(err);
    }

    

  }
}


const initializeGuild = async (guildId) => {
  
}
