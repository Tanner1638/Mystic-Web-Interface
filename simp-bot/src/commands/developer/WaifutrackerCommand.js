const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class WaifutrackerCommand extends BaseCommand {
  constructor() {
    super('waifutracker', 'developer', ["wt"]);
  }

  run(client, message, args) {

    if(args[0] == "true"){
      lillySeeker = true;
      message.channel.send('Notifications Enabled.');
    }
    else{
      lillySeeker = false;
      message.channel.send('Notifications Disabled.');
    }
    
  }
}