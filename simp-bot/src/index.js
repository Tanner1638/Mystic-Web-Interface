require('dotenv').config({ path: __dirname + `/../../.env`});
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
//const config = require('../slappey.json');
const client = new Client();
const mongoose = require('mongoose');
const GuildConfig = require('../../backend/src/database/schemas/GuildConfig');
const a = require('npm');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We connected to the database!!!");
});


(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefixes = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  //console.log('are we online?');
  await client.login(process.env.BOT_TOKEN);
  a.load(() => a.run("dash"));
})();


