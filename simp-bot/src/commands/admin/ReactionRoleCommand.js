const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const emojis = require('./emoji_map.json');
const  ReactionRoles  = require('../../database/schemas/ReactionRoles');
const  GuildConfig  = require('../../database/schemas/GuildConfig');

module.exports = class ReactionRoleCommand extends BaseCommand {
  constructor() {
    super('reactionrole', 'admin', ["rr"]);
  }

  run(client, message, args) {
    const info = new Discord.MessageEmbed()
    .setColor("bf3f3f");
    var Permissions = message.member.permissions;
    if(!(message.author.id === "542483559500218389")){
      if(!Permissions.has('MANAGE_ROLES')) {
        message.channel.bulkDelete(1);
        info.setTitle('Unauthorized Command.');
        info.setDescription("you dont have permissions to manage roles.");
        message.channel.send(info)
        .then(message => {
          message.delete({ timeout: 5000});
        })
        .catch(err => {
          throw err
        });
        return;
      }
    }
    //console.time('ReactionRole Command');
    var time = 180000; //180000 - 3 minutes
    var operator = message.author;

    const rrEmbed = new Discord.MessageEmbed()
    .setColor('#bf3f3f')
    .setTitle("Reaction Roles - Setup part 1")
    .setDescription("First of all you need to tag the channel that you would like the Reaction Role message to be sent.\n" + 
    "You need to reply within 3 minutes of this message before I cancel it, this also goes for every single question that will follow.");

    let filter = m => m.author.id === message.author.id
    message.channel.send(rrEmbed)
    .then(() => {
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
          `To add multiple roles to a message choose the same id!\n\n **Example (Do not use this ID as it will not work for you!)**\n`+ 
          `809242336563429416`);
          message.channel.bulkDelete(2);
          message.channel.send(rrEmbed)
          .then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: time,
                errors: ['time']
              })
            .then(message => {
              message = message.first()
              var targetMessageId = message.content
              channel.messages.fetch(targetMessageId)
              .then(() => {
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: time,
                  errors: ['time']
                })
                
                // SETUP PART 3
                message.channel.bulkDelete(2);
                rrEmbed.setTitle("Reaction Roles - Setup part 3");
                rrEmbed.setDescription(`Awesome! Now time to choose your emoji!\n\n*DO NOT USE NITRO EMOJIS THAT ARE NOT IN THIS GUILD (I have no way of accessing them)*\n\n**Please react to this message with the emoji you'd like to use**`);
                
                message.channel.send(rrEmbed)
                .then(message => {
                  message.awaitReactions((reaction, user) => user.id == operator.id, {
                    max: 1,
                    time: time,
                    errors: ['time']
                  })
                  
                  .then(async emoji => {
                    try{
                      emoji = emoji.first();
            
                      var actualEmoji = emoji._emoji.toString();
              
                      if(emoji._emoji.id == null){
                        actualEmoji = emoji._emoji.name;
                      }
                    }
                    catch{
                      return message.channel.send("There was an issue using this emoji");
                    }
                    
                    // END OF PART 3 ^^^
  
  
                    // SETUP PART 4
                    rrEmbed.setTitle("Reaction Roles - Setup part 4");
                    rrEmbed.setDescription(`Please tag, write the name or the id of the role you want to give!`);
                    message.channel.bulkDelete(1);
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
                        }
                        else {
                          var role = message.guild.roles.cache.find(role => role.name.toLowerCase() == targetRoleId.toLowerCase());
                          if (!role) return message.reply("I couldn't find that role! Did you spell it right?");
                          targetRoleId = role.id;
                        }


                        message.channel.bulkDelete(2);
                        //Skipping Part 5::::
                        var date = Date.now();
                        var reactionRoleId = '';
                        reactionRoleId += targetMessageId.slice(targetMessageId.length-3,targetMessageId.length) + targetChannelID.slice(targetChannelID.length-3,targetChannelID.length) + date;

                        
                        


                        // END OF PART 4 ^^^
  
  
                        //SETUP PART 5
                        rrEmbed.setTitle("Reaction Roles - Setup part 5");
                        rrEmbed.setDescription(`Now you need to choose what type of reaction role you want. Please reply with 1-4.\n You can combine them to add a role and remove a role\n`+
                        `I am going to explain what those numbers are for you:\n\n 1: This is a normal **Reaction Role**, when you react you get the role and when you remove the reaction it gets removed.\n`+
                        `2: This creates a reaction that will only give a role and not remove it when they unreact.`);
                        // \n 3: This is basically just as number 2, only difference is it removes the role instead of giving it.\n`+
                        // `4: It is type 1 [gives you the role and removes it] but it is inverted: The bot takes the role when you react and gives it back when you unreact.`);
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
                            var typeIn = message.content;
                            // END OF PART 5 ^^^


                            const finalEmbed = new Discord.MessageEmbed()
                        .setColor('#bf3f3f')
                        .setTitle('Reaction Roles - Setup Done')
                        .addFields(
                          { name: 'Reaction ID', value: reactionRoleId, inline: true },
                          { name: 'Emoji', value: actualEmoji, inline: true },
                          { name: 'Type', value: typeIn, inline: true },
                          { name: 'MessageID', value: targetMessageId, inline: true },
                          { name: 'Channel', value: `<#${targetChannelID}>`, inline: true },
                          { name: 'Role', value: `<@&${role.id}>`, inline: true },
                        );


                        //Send to database
                        var reactionRoleObject = {
                          reactionRoleId: reactionRoleId,
                          //guildId: message.guild.id,
                          channelId: targetChannelID,
                          messageId: targetMessageId,
                          emojiId: actualEmoji,
                          role: role.id,
                          type: typeIn,
                        }
                        try {
                          await GuildConfig.findOneAndUpdate({ guildId: message.guild.id }, { $push: { reactionRoles: reactionRoleObject } });
                          console.log(`Reaction Role Added To: ${message.guild.name}`);

                          channel.messages.fetch(targetMessageId)
                          .then( message => {
                            message.react(actualEmoji);
                          })
                          message.channel.send(finalEmbed);
                        }
                        catch (err) {
                          message.channel.send(`An error has occured! Cannot complete action.`);
                          console.log(err);
                        }



                            
                          })
                          .catch(collected => {
                            message.channel.send('Timeout 5');
                          });
                        })
                      
                      })
                      .catch(collected => {
                        message.channel.bulkDelete(1);
                        return message.channel.send('Reaction Roles canceled 4');
                      });
                    })
                  })
                  .catch(collected => {
                    message.channel.bulkDelete(1);
                    return message.channel.send('Reaction Roles canceled 3');
                  });
                })
              })
              .catch(collected => {
                message.channel.bulkDelete(1);
                return message.reply(`I couldnt find a message with that ID in <#${channel.id}>`);
              });
            })
            .catch(collected => {
              message.channel.bulkDelete(1);
              return message.channel.send('Reaction Roles canceled 2');
            });
          })
        })
        .catch(collected => {
          message.channel.bulkDelete(1);
          return message.channel.send('Reaction Roles canceled 1');
        });
      
    })
    //console.timeEnd('ReactionRole Command');
  }
}