const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
//const React = require('react');
//const useQuery = require('@apollo/client');


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if (message.guild.id == '807844741793316925'){
      if(message.channel.id == '808169622994026497'){
        globalSay(client, message.content);
      }
    }

    //console.log(`Guild: ${message.guild.name}\nChannelName: ${message.channel.name}\nChannel ID: ${message.channel.id}\n${message.author.username}: ${message.content}\n`)


    


    var prefix = "!";

    const guildObject = message.guild;
    const query = GuildConfig.where({ guildId: guildObject.id});
    await query.findOne(function (err, guild) {
      if (err) return handleError(err);
      if(guild){
        prefix = guild.get('prefix');
      }
    });

    
    if (message.content.startsWith(prefix)) {
      console.log("\n---Message starts with prefix. Continuing---\n");
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}

function globalSay(client, message) {
  // var targetGuild = '723441004002148374'; //Mystics OG Squad
  // var targetChannel = '723441004002148377'; //General chat

   var targetGuild = '733505271686627339'; //Taes server
   var targetChannel = '733505271686627342'; //General chat

   //var targetGuild = '520102286102495243'; //ZEO server
   //var targetChannel = '520102286102495247'; //General chat

   







    // var targetGuild = '807844741793316925'; //Mystic Code
    // var targetChannel = '807874255848341515'; //bot test
  let guild = client.guilds.cache.get(targetGuild),
    channel;


  if (guild) {
    channel = guild.channels.cache.get(targetChannel);
    if (channel) {

      let newMessage = message;
      channel.send(newMessage);
    }
    else {
      console.log("There's no channel with that ID.");
    }
  }
}