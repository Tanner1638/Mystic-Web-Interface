const ReactionRoles = require('../../database/schemas/ReactionRoles');
const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

module.exports = class RemoveReactionRoleCommand extends BaseCommand {
  constructor() {
    super('removeReactionRole', 'admin', []);
  }

  async run(client, message, args) {
    return message.reply("This command is currently disabled :(");
    try {
      //console.log('fucking work')
      const query = GuildConfig.where({ guildId: message.guild.id });
      await query.findOne(function (err, guild) {
        if (err)
          return handleError(err);
        if (guild) {
          //console.log("We found a guild.")
          var reactionRoles = guild.get('reactionRoles');
          for(var i in reactionRoles)
          {
            //console.log(`Checking reactionroles: ${i}: ${reactionRoles[i]}`)
            
            var reactionQuery = ReactionRoles.where({ ReactionRoleId: reactionRoles[i]});
             reactionQuery.findOne(function (err, reaction) {
              if (err)
              return handleError(err);
              if (reaction) {
                if(reaction.ReactionRoleId == args[0]){
                  console.log("we also found it in reactionroles");
                  console.log(`ObjectID: ${reaction._id}`);
                  ReactionRoles.deleteOne({ReactionRoleId: reaction.ReactionRoleId});
                }
                
                
                

              }
            })
            if(reactionRoles[i] == args[0]){
              console.log("Yep we found this one in the guildconfigs");

            }
          }
        }
      });
      //await GuildConfig.findOneAndUpdate({ guildId: guildObject.id}, { $pull: {reactionRoles: args[0]}});
    }
    catch{
      console.error();
    }
  }
}