import React from 'react';
import { MenuComponent } from '../../components';
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
        console.log(data);
        return (
            <body class="test">
                <nav>
                    <a href="">Home</a>
                    <a href="menu">Menu</a>

                </nav>

                <h1>Menu Page</h1>
                <MenuComponent guilds={ getMutualGuilds }/>

            </body>
        )
    } return <h1>Loading...</h1>
}