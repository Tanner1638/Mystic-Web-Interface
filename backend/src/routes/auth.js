const router = require('express').Router();
const passport = require('passport');
require('dotenv').config({path: __dirname + '/../../../.env'});

router.get('/discord', passport.authenticate('discord') );

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect(`http://${process.env.IP_ADDRESS}:${process.env.REACT_PORT}/menu`);
});

router.get('/', (req, res) => {
    if (req.user){
        res.send(req.user);
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
})

module.exports = router;