const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const GuildConfig = require('../../database/schemas/GuildConfig');
const User = require('../../database/schemas/User');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send('Test command works');

    const member = message.author;

    try {
      
      /*
      // THIS WILL ADD THE USER TO USERS DATABASE IF USED
      const user = await User.create({
        discordId: member.id,
        discordTag: member.discriminator,
        avatar: member.avatar,
      });
      */
     /*
     // THIS PRINTS ALL USERS IN users db
     User.find(function (err, users) {
       if (err) return console.error(err);
       console.log(users);
     })
      */
     
      /*
      const testQuery = User.where({ discordId: member.id});
      testQuery.findOne(function (err, testquery) {
        if (err) return handleError(err);
        if(testquery){
          console.log('USER DOCUMENT FOUND');
          const tag = testquery.get('discordTag');
          const avatar = testquery.get('avatar');
          console.log(`Discord ID: ${member.id}`);
          console.log(`Discord Tag: ${tag}`);
          console.log(`Avatar: ${avatar}`);
        }

      });
      */

      //message.channel.send(message.guild.id);
      
      //User.findOne({ discordId: member.id }, console.log(discordTag));
      //console.log(discrim.discordTag);

    } catch (err) {
      console.log(err);
    }

  }
}