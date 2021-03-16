const { BroadcastDispatcher } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    //maintenanceMode(client);
    clientCache.set("debug", false);

    //getServingData(client);

    
  }
}

// function getServingData(client) {
//   var guilds = client.guilds.cache;
//   var serverCount = 0;
//   var memberCount = 0;

//   guilds.forEach(guild => {
//     console.log(guild.memberCount);
//     memberCount += guild.memberCount;
//     serverCount += 1;
//   });

//   let streamArg = `Serving ${memberCount} members in ${serverCount} servers!`;
//   client.user.setActivity(streamArg, {
//     type: "STREAMING",
//     url: "https://www.twitch.tv/zvmysticvz"
//   }).catch(console.error);
// }

function maintenanceMode(client) {
  let streamArg = "Under Maintenance - Expect delayed responses to commands!";
  client.user.setActivity(streamArg, {
    type: "STREAMING",
    url: "https://www.twitch.tv/zvmysticvz"
  }).catch(console.error);
}