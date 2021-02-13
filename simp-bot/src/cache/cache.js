const  GuildConfig  = require('../database/schemas/GuildConfig');

module.exports = async function cacheGuild(guildId){

    const query = GuildConfig.where({ guildId: guildId });
    await query.findOne(function (err, guild) {
        if (err)
          return handleError(err);
        if (guild) {
            console.log(`Adding ${guild.guildName} to cache`);
            return guildCache.set(guildId, guild, 1200);
        }
    });

}