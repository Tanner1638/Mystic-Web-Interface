const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');
//const React = require('react');
//const useQuery = require('@apollo/client');


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    //console.time('MessageEvent.js');
    
    

    var prefix = "!";
    //prefix = await getPrefix(message);
    const guildObject = message.guild;
    const query = GuildConfig.where({ guildId: guildObject.id });
    await query.findOne(function (err, guild) {
      if (err)
        return handleError(err);
      if (guild) {
        prefix = guild.get('prefix');
      }
    });
    
    
    if(!message.content.startsWith(prefix)) {
      //console.timeEnd('MessageEvent.js');
      return 
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
        commandLog(client, message);
        message.channel.stopTyping();
      }
    }
    //console.timeEnd('MessageEvent.js');
  }
}

async function getPrefix(message) {
  const guildObject = message.guild;
  const query = GuildConfig.where({ guildId: guildObject.id });
  await query.findOne(function (err, guild) {
    if (err)
      return handleError(err);
    if (guild) {
      return guild.get('prefix');
    }
  });
  return prefix;
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
      .setThumbnail("https://cdn.discordapp.com/app-icons/755513775318368307/80b46437d91ca1fce94abc7f543cc833.png")
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