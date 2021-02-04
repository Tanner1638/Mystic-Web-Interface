require('dotenv').config({ path: __dirname + `/../../.env`});
require('./strategies/discord');

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const Store = require('connect-mongo')(session);
const { graphqlHTTP } = require('express-graphql');
const RootSchema = require('./graphql');
const a = require('npm');

const app = express();
const PORT = process.env.PORT || 3002;
const IP_ADDRESS = process.env.IP_ADDRESS;
const REACT_PORT = process.env.REACT_PORT;
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( cors( {
  origin: [`http://${IP_ADDRESS}:${REACT_PORT}`],
  credentials: true,
}))

app.use( session( {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize() );
app.use(passport.session());


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: RootSchema,
}));

app.use('/api', routes);


app.listen( PORT, () => console.log(`Running on Port ${PORT}`));

console.log("we're gonna try to do a thing here");

a.load(() => a.run("botDev"));

