import axios from 'axios';
require('dotenv').config({path: __dirname + '/../../../.env'});
const IP_ADDRESS = process.env.IP_ADDRESS;
const PORT = process.env.PORT;

export function getUserDetails() {
    return axios.get(`http://${IP_ADDRESS}:${PORT}/api/auth`, { withCredentials: true } );
}

export function getGuilds() {
    return axios.get(`http://${IP_ADDRESS}:${PORT}/api/discord/guilds`, { withCredentials: true } );
}

export function getGuildConfig(guildId) {
    return axios.get(`http://${IP_ADDRESS}:${PORT}/api/discord/guilds/${guildId}/config`, { withCredentials:true } );
}

export function updateGuildPrefix(guildId, prefix) {
    return axios.put(
        `http://${IP_ADDRESS}:${PORT}/api/discord/guilds/${guildId}/prefix`, {
            prefix
        }, {
            withCredentials: true,
        }
    )
}

export function updateDefaultRole(guildId, defaultRole) {
    return axios.put(
        `http://${IP_ADDRESS}:${PORT}/api/discord/guilds/${guildId}/roles/default`,
        {
            defaultRole
        }, {
            withCredentials: true,
        }
    )
}

export function getGuildRoles(guildId) {
    return axios.get(
        `http://${IP_ADDRESS}:${PORT}/api/discord/guilds/${guildId}/roles`, {
            withCredentials: true,
        }
    );
}