import { gql } from '@apollo/client';

export const menuPageQuery = gql`
    query getMenuPageQuery {
        getUser {
            discordId
            discordTag
            avatar
        }
        getMutualGuilds {
            included {
                name
                id
                icon
            }
            excluded {
                name
                id
                icon
            }
        }
    }
`;

export const dashboardPageQuery = gql`
    query getDashboardPageData($guildId: String!) {
        getUser {
            discordId
            discordTag
            avatar
        }
        getGuildConfig(guildId: $guildId) {
            prefix
            guildId
            defaultRole
            memberLogChannel
        }
        getGuildRoles(guildId: $guildId) {
            id
            name
        }
    }
`;