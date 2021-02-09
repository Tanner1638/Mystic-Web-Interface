const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordTag: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    
});

module.exports = mongoose.model('User', UserSchema);