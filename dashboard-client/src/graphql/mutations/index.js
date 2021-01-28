import { gql } from '@apollo/client';

//Make sure field name in backend graphql matches here ;)
export const updateGuildPrefixMutation = gql`
    mutation UpdateGuildPrefix($guildId: String!, $prefix: String) {
        updateGuildPrefix(guildId: $guildId, prefix: $prefix) {
            prefix
            guildId
        }
    }
`;

export const updateDefaultRoleMutation = gql`
    mutation UpdateDefaultRole($guildId: String!, $defaultRole: String) {
        updateDefaultRole(guildId: $guildId, defaultRole: $defaultRole) {
            defaultRole
            guildId
        }
    }
`;