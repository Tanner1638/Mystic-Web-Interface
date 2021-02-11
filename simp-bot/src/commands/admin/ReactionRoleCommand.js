const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const emojis = require('./emoji_map.json');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');

module.exports = class ReactionRoleCommand extends BaseCommand {
  constructor() {
    super('reactionRole', 'admin', ["rr"]);
  }

  run(client, message, args) {
    var time = 180000; //3 minutes

    const rrEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setTitle("Reaction Roles - Setup part 1")
    .setDescription("First of all you need to tag the channel that you would like the Reaction Role message to be sent.\n" + 
    "You need to reply within 3 minutes of this message before I cancel it, this also goes for every single question that will follow.");

    let filter = m => m.author.id === message.author.id
    message.channel.send(rrEmbed).then(() => {
      message.channel.awaitMessages(filter, {
          max: 1,
          time: time,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
          var targetChannelID = message.content.slice(2,(message.content.length-1));
          var channel = client.channels.cache.get(targetChannelID);
          if(!channel) return message.reply("I couldn't find that channel! Does it exist?");
          //END OF PART 1 ^^^


          // SETUP PART 2
          rrEmbed.setTitle("Reaction Roles - Setup part 2");
          rrEmbed.setDescription(`Nice! Now time to choose your message! Please send me your message id\nMake **sure** the message is in the ${message}\n` + 
          `To add multiple roles to a message choose the same id!\n\n **Example (Do not use this ID as it will not work for you!)\n`+ 
          `809242336563429416`);
          message.channel.bulkDelete(2);
          message.channel.send(rrEmbed).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: time,
                errors: ['time']
              })
            .then(message => {
              message = message.first()
              var targetMessageId = message.content;
              var msg = channel.messages.fetch(targetMessageId)
              .then(() => {
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: time,
                  errors: ['time']
                })
                // SETUP PART 3
                rrEmbed.setTitle("Reaction Roles - Setup part 3");
                rrEmbed.setDescription(`Awesome! Now time to choose your emoji! **DO NOT USE NITRO EMOJIS THAT ARE NOT IN THIS GUILD (I have no way of accessing them)**`);
                message.channel.bulkDelete(2);
                message.channel.send(rrEmbed)
                .then(() => {
                  message.channel.awaitMessages(filter, {
                      max: 1,
                      time: time,
                      errors: ['time']
                    })
                  .then(message => {
                    message = message.first();
                    var inputEmoji = message.content;
                    if(inputEmoji.startsWith('<')){
                      var emojiArgs = message.content.slice(1,message.content.length-1).trim().split(/:+/);
                      var emojiId = emojiArgs[2];
                      if(!client.emojis.cache.get(emojiArgs[2])){
                        return message.reply("I couldn't find this emoji! Is it in the guild?");
                      }
                    }
                    else {
                      var emojiExists = false;
                      for(var i in emojis){
                        if(emojis[i] == inputEmoji){
                          emojiExists = true;
                        }
                      }
                      if(!emojiExists){
                        return message.reply("I couldn't find this emoji! Is it in Discord?");
                      }
                    }
                    // END OF PART 3 ^^^
  
  
                    // SETUP PART 4
                    rrEmbed.setTitle("Reaction Roles - Setup part 4");
                    rrEmbed.setDescription(`Please tag, write the name or the id of the role you want to give!`);
                    message.channel.bulkDelete(2);
                    message.channel.send(rrEmbed)
                    .then(() => {
                      message.channel.awaitMessages(filter, {
                          max: 1,
                          time: time,
                          errors: ['time']
                        })
                      .then(async message => {
                        message = message.first()
                        var targetRoleId = message.content;
                        if (targetRoleId.startsWith('<@')) {
                          targetRoleId = targetRoleId.slice(3, targetRoleId.length - 1);
                          var role = message.guild.roles.cache.get(targetRoleId);
                        } else {
                          var role = message.guild.roles.cache.find(role => role.name.toLowerCase() == targetRoleId.toLowerCase());
                          if (!role) return message.reply("I couldn't find that role! Did you spell it right?");
                          targetRoleId = role.id;
                        }



                        message.channel.bulkDelete(2);
                        //Skipping Part 5::::
                        var date = Date.now();
                            var reactionRoleId = '';
                            reactionRoleId += targetMessageId.slice(targetMessageId.length-3,targetMessageId.length) + targetChannelID.slice(targetChannelID.length-3,targetChannelID.length) + date;

                            const finalEmbed = new Discord.MessageEmbed()
                            .setColor('#bf3f3f')
                            .setTitle('Reaction Roles - Setup Done')
                            .addFields(
                              { name: 'Reaction ID', value: reactionRoleId, inline: true },
                              { name: 'Emoji', value: inputEmoji, inline: true },
                              { name: 'Type', value: '1', inline: true },
                              { name: 'MessageID', value: targetMessageId, inline: true },
                              { name: 'Channel', value: `<#${targetChannelID}>`, inline: true },
                              { name: 'Role', value: `<@&${role.id}>`, inline: true },
                            );


                            //Send to database
                            try {
                              const reactionRole = await ReactionRoles.create({
                                ReactionRoleId: reactionRoleId,
                                MessageId: targetMessageId,
                                EmojiId: inputEmoji,
                                Roles: role.id,
                                ReactType: '1',
                              });

                              channel.messages.fetch(targetMessageId)
                              .then( message => {
                                message.react(inputEmoji);
                              })
                          
                              console.log('Reaction Role Created!. Saved to DB');
                              message.channel.send(finalEmbed);
                            } catch (err) {
                              message.channel.send(`An error has occured! Cannot complete action.`);
                              console.log(err);
                            }
                        


                        // END OF PART 4 ^^^
  
  
                        // SETUP PART 5
                        // rrEmbed.setTitle("Reaction Roles - Setup part 5");
                        // rrEmbed.setDescription(`Now you need to choose what type of reaction role you want. Please reply with 1-4.\n You can combine them to add a role and remove a role\n`+
                        // `I am going to explain what those numbers are for you:\n\n 1: This is a normal **Reaction Role**, when you react you get the role and when you remove the reaction it gets removed.\n`+
                        // `2: This creates a reaction that will only give a role and not remove it when they unreact.\n 3: This is basically just as number 2, only difference is it removes the role instead of giving it.\n`+
                        // `4: It is type 1 [gives you the role and removes it] but it is inverted: The bot takes the role when you react and gives it back when you unreact.`);
                        // message.channel.bulkDelete(2);
                        // message.channel.send(rrEmbed)
                        // .then(() => {
                        //   message.channel.awaitMessages(filter, {
                        //       max: 1,
                        //       time: time,
                        //       errors: ['time']
                        //     })
                        //   // .then(async message => {
                        //   //   message = message.first()
                        //   //   var type = message.content;
                        //   //   // END OF PART 5 ^^^

                            
                        //   // })
                        //   // .catch(collected => {
                        //   //   message.channel.send('Timeout 5');
                        //   // });
                        // })
                      })
                      .catch(collected => {
                        message.channel.send('Reaction Roles canceled: Took too long to respond.');
                      });
                    })
                  })
                  .catch(collected => {
                    message.channel.send('Reaction Roles canceled: Took too long to respond.');
                  });
                })
              })
              .catch(collected => {
                message.reply(`I couldnt find a message with that ID in <#${channel.id}>`);
              });
            })
            .catch(collected => {
              message.channel.send('Reaction Roles canceled: Took too long to respond.');
            });
          })
        })
        .catch(collected => {
            message.channel.send('Reaction Roles canceled: Took too long to respond.');
        });
    })
  }
}