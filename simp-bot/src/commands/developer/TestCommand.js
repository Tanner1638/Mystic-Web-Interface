const BaseCommand = require('../../utils/structures/BaseCommand');
var add = require('../../cache/cache');
// const emojis = require('../admin/emoji_map.json');
// const ReactionRoles = require('../../database/schemas/ReactionRoles');
// const GuildConfig = require('../../database/schemas/GuildConfig');
const NodeCache = require( "node-cache" );
// const myCache = new NodeCache();

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', ["t"]);
  }

  async run(client, message, args) {
    message.channel.send("Test command works! Wonderful!")

    // var count = 1;
    // console.log(`Count Before func: ${count}`);
    // count = add(count);
    // console.log(`Count after: ${count}`);
    // count = add(count);
    // console.log(`Count after: ${count}`);

    //console.log(`Cached Prefix: ${prefixCache.get(message.guild.id)}`);
    
    




    //shutDownFunction(message, operator, msg);

  }
}

function shutDownFunction(message, operator, msg) {
  message.reply('The bot will now shut down.\nConfirm with a thumb up or deny with a thumb down.')
    .then(message => {
      message.react('👍')
        .then(() => message.react('👎'))
        .then(() => {
          message.awaitReactions((reaction, user) => user.id == operator.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'), {
            max: 1,
            time: 30000
          })
            .then(collected => {
              if (collected.first().emoji.name == '👍') {
                msg.reply('Shutting down...');
              }

              else
                msg.reply('Operation canceled.');
            })
            .catch(() => {
              msg.reply('No reaction after 30 seconds, operation canceled');
            });
        });
    });
}
