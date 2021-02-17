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

    const listEmbed1 = new Discord.MessageEmbed()
      .setTitle("Reaction Roles List")
      .setColor("bf3f3f")
      const listEmbed2 = new Discord.MessageEmbed()
      .setTitle("Reaction Roles List")
      .setColor("bf3f3f");



    var server = guildCache.get(message.guild.id);
    var reactionRoles = server.reactionRoles;
    for (var i in reactionRoles) {
      var rrObject = reactionRoles[i];
      if(i < 20){ 
        listEmbed1.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
      }
      if(i >= 20 && i<40){
        listEmbed2.addField(`Reaction ID: ${rrObject.reactionRoleId}`, `Emoji: ${rrObject.emojiId}\nMessage ID: ${rrObject.messageId}\nChannel: <#${rrObject.channelId}>\nType: ${rrObject.type}\nRole: <@&${rrObject.role}>\nDirect Link: [Click here](https://discord.com/channels/${message.guild.id}/${rrObject.channelId}/${rrObject.messageId})`);
      }
    }
    await sendEmbed(reactionRoles, message, listEmbed1, listEmbed2)
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

          await message.channel.bulkDelete(4);
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

async function sendEmbed(reactionRoles, message, listEmbed1, listEmbed2) {
  if (reactionRoles.length < 20) {
    message.channel.send(listEmbed1);
  }
  else {
    message.channel.send(listEmbed1);
    await message.channel.send(listEmbed2);
  }
}