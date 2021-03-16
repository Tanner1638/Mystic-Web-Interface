const mongoose = require('mongoose');

const ReactionRolesSchema = new mongoose.Schema({
    ReactionRoleId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    Message: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: false,
    },
    EmojiId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: false,
    },
    
    Roles: {
        type: mongoose.SchemaTypes.Array,
        required: true,
        unique: false,
    },
    ReactType: {
        type: mongoose.SchemaTypes.String,
        required: false,
        unique: false,
    },
    
});

module.exports = mongoose.model('ReactionRoles', ReactionRolesSchema);