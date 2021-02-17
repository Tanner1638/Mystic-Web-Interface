const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '!',
    },
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    defaultRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    memberLogChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    inviteLinks: {
        type: mongoose.SchemaTypes.Array,
        required: false,
    },
    reactionRoles: {
        type: mongoose.SchemaTypes.Array,
        required: false,
    },
    lockedChannels: {
        type: mongoose.SchemaTypes.Array,
        required: false,
    },
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);