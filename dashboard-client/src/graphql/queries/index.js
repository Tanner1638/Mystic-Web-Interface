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
            }
            excluded {
                name
                id
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