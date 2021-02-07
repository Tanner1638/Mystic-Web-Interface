const BaseCommand = require('../../utils/structures/BaseCommand');

/**
 * will mass delete messages given a number to delete
 * @version 4.3.4
 */

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'admin', []);
  }

  async run(client, message, args) {
    if(!args[0] || parseInt(args[0],10) <= 0){
      return message.reply('How many messages do you want to delete? (1 - 99)');
    }
    let amount = parseInt(args[0],10)+1;
    
    let time = 5000; //5 Seconds

    if(amount > 100) {
      message.reply(`I can only delete 99 messages at a time!\n*This message will delete after ${time/1000} seconds*`)
      .then(message => {
        message.delete({ timeout: time});
      })
      .catch(err => {
        throw err
      });
    }
    else{
      message.channel.bulkDelete(amount);
      message.reply(`${amount-1} messages deleted.`)
      .then(message => {
        message.delete({ timeout: time });
      })
      .catch(err => {
        throw err
      });

    }
    
  }
}