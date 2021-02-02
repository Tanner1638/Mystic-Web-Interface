import React from 'react';
import { MenuComponent } from '../../components';
import { LoadingModule } from '../../components';
import { getUserDetails, getGuilds } from "../../utils/api";
import { useQuery } from '@apollo/client';
import { menuPageQuery } from '../../graphql/queries';

export function MenuPage( {
    history,
} ) {
    console.log("hiyo");
    

    const { loading, error, data } = useQuery(menuPageQuery);
    if(!loading && !error) {
        const { getMutualGuilds } = data;
        console.log("Heres ya data");
        console.log(data);
        return (
            <MenuComponent guilds={ getMutualGuilds }/>
        )
    } return (
        <LoadingModule/>
    )
}