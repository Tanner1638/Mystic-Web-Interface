const { BroadcastDispatcher } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

    maintenanceMode(client);
    clientCache.set("debug", false);

    
  }
}

function maintenanceMode(client) {
  let streamArg = "Under Maintenance - Expect delayed responses to commands!";
  client.user.setActivity(streamArg, {
    type: "STREAMING",
    url: "https://www.twitch.tv/zvmysticvz"
  }).catch(console.error);
}