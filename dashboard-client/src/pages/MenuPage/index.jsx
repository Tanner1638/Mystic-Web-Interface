import React from 'react';
import { MenuComponent } from '../../components';
import { getUserDetails, getGuilds } from "../../utils/api";
import { useQuery } from '@apollo/client';
import { menuPageQuery } from '../../graphql/queries';

export function MenuPage( {
    history,
} ) {

    const { loading, error, data } = useQuery(menuPageQuery);

    if(!loading && !error) {
        const { getMutualGuilds } = data;
        return (
            <div>
                <h1>Menu Page</h1>
                <MenuComponent guilds={ getMutualGuilds }/>
            </div>
        )
    } return <h1>Loading...</h1>
}