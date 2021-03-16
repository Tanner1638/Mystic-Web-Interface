const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SsayCommand extends BaseCommand {
  constructor() {
    super('ssay', 'developer', []);
  }

  async run(client, message, args) {
    try {
      let channel = args[0].slice(2,args[0].length-1);
      let botMessage = args.slice(1).join(" ");
      const editMessage = message.content.slice(6).trim();
      
      var sMessage = ""
      // args.forEach(arg => {
      //   sMessage += `||${arg}|| `;
      // })
      console.log(editMessage.length);
      for(var i = 0; i < editMessage.length; i++){
        sMessage += `||${editMessage.charAt(i)}||`;
      }

      message.channel.bulkDelete(1);
      message.channel.send(sMessage);
    }
    catch (err) {
      await message.channel.bulkDelete(1);
      let newMessage = args.slice(0).join(" ");
      var sMessage = ""
      args.forEach(arg => {
        sMessage += `||${arg}|| `;
      });

      //client.channels.cache.get(channel).send(sMessage);

      //message.channel.send(sMessage);
    }

  }
};