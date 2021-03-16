const BaseEvent = require('../../utils/structures/BaseEvent');
const  GuildConfig  = require('../../database/schemas/GuildConfig');
const Discord = require('discord.js');
const cacheGuild = require('../../cache/cache');

//const NodeCache = require( "node-cache" ); - remove later
//const React = require('react');
//const useQuery = require('@apollo/client');


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('voiceStateUpdate');
  }

  run(client, member) {
    //   console.log("Sad")
    //   if(member.id == "755513775318368307"){
    //       console.log("HECC")
    //       console.log(member.channel.)
    //   }
      
  }


}