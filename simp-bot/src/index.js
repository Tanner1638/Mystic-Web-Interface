require('dotenv').config({ path: __dirname + `/../../.env`});
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
//const config = require('../slappey.json');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const GuildConfig = require('../../backend/src/database/schemas/GuildConfig');
const a = require('npm');
const botOnly = true;
const NodeCache = require( "node-cache" );

// Cached Data
//global.prefixCache = new NodeCache();
global.guildCache = new NodeCache();



mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We connected to the database!!!");
});



(async () => {
  //console.time('async load');
  client.commands = new Map();
  client.events = new Map();
  client.prefixes = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  //console.log('are we online?');
  await client.login(process.env.BOT_TOKEN);
  if(!botOnly) {
    a.load(() => a.run("dash"));
  }
  //console.timeEnd('async load');
})();
////console.timeEnd('Bot Index.js');