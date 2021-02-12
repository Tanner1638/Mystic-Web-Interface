const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../admin/emoji_map.json');
const ReactionRoles = require('../../database/schemas/ReactionRoles');
const GuildConfig = require('../../database/schemas/GuildConfig');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', ["t"]);
  }

  async run(client, message, args) {

    var operator = message.author;
    var msg = message;
    //message.channel.send("Test command works! Wonderful!")

    let filter = m => m.author.id === message.author.id
    message.channel.send("Yes React To this message")
    .then(message => {
      message.awaitReactions((reaction, user) => user.id == operator.id, {
        max: 1,
        time: 10000,
        errors: ['time']
      })
      .then(async emoji => {
        emoji = emoji.first();
        

        console.log("Reaction Recieved.");
        console.log(emoji._emoji);

        var actualEmoji = emoji._emoji.toString();

        if(emoji._emoji.id == null){
          actualEmoji = emoji._emoji.name;
        }



        var reactionRoleObject = {
          //guildId: message.guild.id,
          //channelId: targetChannelID,
          messageId: message.id,
          emojiId: actualEmoji,
          role: '807859278820016180',
          type: '1',
        }
        await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { $push: { reactionRoles: reactionRoleObject } });
        
      })
    })


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
