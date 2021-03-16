const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');
const cacheGuild = require('../../cache/cache');

//const NodeCache = require( "node-cache" ); - remove later
//const React = require('react');
//const useQuery = require('@apollo/client');


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) {
      return; //return if message came from bot
    }

    if (message.content === "--exit"){
      clientCache.set("debug", false);
      message.channel.send("Returning to normal opperations");
    }

    if (clientCache.get("debug")) return;


    if (message.channel.type === 'dm'){
      let user = client.users.cache.find(user => user.id === '542483559500218389')
      const dmEmbed = new Discord.MessageEmbed()
      .setColor('bf3f3f')
      .setAuthor(message.author.username)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
      .setDescription(message.content);
      
      user.send(dmEmbed);
      return;
    
    }

    var server = guildCache.get(message.guild.id);
    
    if(server === undefined){
      await cacheGuild(message.guild.id);
      server = await guildCache.get(message.guild.id);
    }
    
    var prefix;
    try {
      prefix = server.prefix;
    }
    catch{
      console.log("Server not preloaded...");
      prefix = "-";
    }

    
    

    if (message.content.startsWith(prefix)) {
      //console.log(`Guild: ${message.guild.name}. ${message.author.username}: ${message.content}`);
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName.toLowerCase());
      if (command) {
        message.channel.startTyping();
        if(command.category == "developer" && message.member.id != '542483559500218389'){
          message.channel.bulkDelete(1);
          message.reply("this is a developer command ;)")
          .then(message => {
            message.delete({ timeout: 5000});
          })
          .catch(err => {
            throw err
          });
          return;
        }
        
        command.run(client, message, cmdArgs);
        //commandLog(client, message);
        message.channel.stopTyping();
      }
    }
  }
}


function commandLog(client, message) {
  var targetGuild = '807844741793316925'; //Mystic Code
  var targetChannel = '809780593189322805'; //Chaos Command Logs

  let guild = client.guilds.cache.get(targetGuild),
    channel;


  if (guild) {
    channel = guild.channels.cache.get(targetChannel);
    if (channel) {
      const info = new Discord.MessageEmbed()
      .setTitle(`Command Used!`)
      .setColor("bf3f3f")
      .setTimestamp()
      .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}`)
      .setDescription(`**${message.author.username}** has used a command in the **${message.guild.name}** server!\n\n${message.content}\n
      ---------------------------------------------------------------------
      `);
      
      channel.send(info);
    }
    else {
      console.log("There's no channel with that ID.");
    }
  }


}



//Chaos Bot Personality functions
    // if (message.guild.id == '807844741793316925'){
    //   if(message.channel.id == '808169622994026497'){
    //     globalSay(client, message.content);
    //   }
    // }

function globalSay(client, message) {
   var targetGuild = '723441004002148374'; //Mystics OG Squad server
   var targetChannel = '757572261481021641'; //General chat

  let guild = client.guilds.cache.get(targetGuild),
    channel;


  if (guild) {
    channel = guild.channels.cache.get(targetChannel);
    if (channel) {

      let newMessage = message;
      channel.send(newMessage, {tts: true});
    }
    else {
      console.log("There's no channel with that ID.");
    }
  }
}