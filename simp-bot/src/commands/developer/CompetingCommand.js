const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class CompetingCommand extends BaseCommand {
  constructor() {
    super('competingin', 'developer', []);
  }

  run(client, message, args) {
    let competingArg = args.slice(0).join(" ");
      client.user.setActivity(competingArg, {
        type: "COMPETING"
      }).catch(console.error);
  }
}