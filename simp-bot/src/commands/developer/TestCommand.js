const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require ('../admin/emoji_map.json');
//const mongoose = require('mongoose');
//const GuildConfig = require('../../database/schemas/GuildConfig');
//const User = require('../../database/schemas/User');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', ["t"]);
  }

  async run(client, message, args) {

    //console.log(args[0])
    
    for(var i in emojis){
      if(emojis[i] == args[0]){
        console.log("WE FUCKIN FOUND IT")
      }
    }
    console.log('weve faileed')
    //console.log(emojis.hasOwnProperty('\ud83d\ude0b'))
    
    

  }
}