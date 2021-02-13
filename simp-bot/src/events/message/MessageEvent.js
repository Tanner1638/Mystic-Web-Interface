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
    if (message.author.bot) return;
    
    var server = guildCache.get(message.guild.id);
    
    if(server == undefined){
      cacheGuild(message.guild.id);
      return;
    }
    var prefix = server.prefix;
    

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