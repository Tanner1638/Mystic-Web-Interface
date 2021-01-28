import React from 'react';
import { DashboardMenu } from '../../components';
//import { getGuildRoles } from '../../utils/api'
//import { useMultiStyleConfig } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { dashboardPageQuery } from '../../graphql/queries';
import { updateDefaultRoleMutation, updateGuildPrefixMutation } from '../../graphql/mutations';


export function DashboardPage( {
    history,
    match,
}) {

    const { loading, error, data } = useQuery(dashboardPageQuery, { variables: {guildId: match.params.id }});
    const [ updatePrefix ] = useMutation(updateGuildPrefixMutation);
    const [ updateDefaultRole ] = useMutation(updateDefaultRoleMutation);

    const updateGuildPrefixParent = async (prefix) => {
        try {
            const response = await updatePrefix({
                variables: {
                    guildId: match.params.id,
                    prefix,
                }
            });
        } catch ( err ) {
            console.log(err);
        }
    }

    const updateDefaultRoleParent = async (roleId) => {
        try {
            const response = await updateDefaultRole({
                variables: {
                    guildId: match.params.id,
                    defaultRole: roleId,
                }
            });
        } catch (err){
            console.log(err);
        }
    }

    if(!loading && !error) {
        const {
            getGuildConfig,
            getGuildRoles,
            getUser,
        } = data;
        return (
            <div>
                <h1>Menu Page</h1>
                <DashboardMenu
                    user={getUser}
                    config={getGuildConfig}
                    roles={getGuildRoles}
                    updatePrefix={updateGuildPrefixParent}
                    updateRole={updateDefaultRoleParent}
                />
            </div>
        )
    } return <h1>Loading...</h1>
}