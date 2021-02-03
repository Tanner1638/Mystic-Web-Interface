/*
import { updateDefaultRoleMutation, updateGuildPrefixMutation } from '../../../../dashboard-client/src/graphql/mutations';
import { useQuery, useMutation } from '@apollo/client';
const BaseCommand = require('../../utils/structures/BaseCommand');
const  GuildConfig  = require('../../database/schemas/GuildConfig');


module.exports = class SetPrefixCommand extends BaseCommand {
  constructor() {
    super('setPrefix', 'admin', []);
  }

  run(client, message, args) {

    if (!args[1]) {
      message.channel.send("You need to provide more info!");
    } else {
      message.channel.send(args[0]);
      var prefix = args[0];

      const [ updatePrefix ] = useMutation(updateGuildPrefixMutation);

      const updateGuildPrefixParent = async (prefix) => {
        try {
            const response = await updatePrefix({
                variables: {
                    guildId: match.params.id,
                    prefix,
                }
            });
        } catch ( err ) {
            console.log(err);
        }
    }

      //const query = GuildConfig.where({ guildId: guildObject.id });
      //query.findOneAndUpdate(guild, args[0])
      
    }


  }
}
*/