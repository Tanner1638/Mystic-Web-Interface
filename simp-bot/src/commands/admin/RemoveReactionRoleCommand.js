const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');

module.exports = class RemoveReactionRoleCommand extends BaseCommand {
  constructor() {
    super('removerole', 'admin', ["rrr"]);
  }

  async run(client, message, args) {
    var time = 60000;
    //return message.reply("This command is currently disabled :(");
    const MessageInfo = new Discord.MessageEmbed()
      .setTitle("Reaction Roles - Message Information")
      .setColor("bf3f3f")
      .setDescription("What is the **Reaction ID** of the reaction emoji you want to remove?");

    message.channel.send(MessageInfo);

    let filter = m => m.author.id === message.author.id

    const listEmbed = new Discord.MessageEmbed()
      .setTitle("Reaction Roles List")
      .setColor("bf3f3f")



    var server = guildCache.get(message.guild.id);
    var reactionRoles = server.reactionRoles;
    for (var i in reactionRoles) {
      var rrObject = reactionRoles[i];
      listEmbed.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
    }
    message.channel.send(listEmbed)
    .then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: time,
          errors: ['time']
        })
        .then(async message => {
          message = message.first()
          var args = message.content.trim().split(/\s+/);
          await GuildConfig.findOneAndUpdate({ guildId: message.guild.id}, { $pull: {reactionRoles: {reactionRoleId: args[0]}}});

          await message.channel.bulkDelete(3);
          MessageInfo.setTitle("Reaction Role Deleted!");
          MessageInfo.setDescription("I have removed that emoji from my database.")
          
          message.channel.send(MessageInfo)
          .then(message => {
            message.delete({ timeout: 5000});
          })
          .catch(err => {
            throw err
          });


        })
        .catch(collected => {
          message.channel.send("Remove Reaction Role Canceled!");
        })

    })
    .catch(collected => {
      message.channel.send("You took too long!")
    })

  }
}