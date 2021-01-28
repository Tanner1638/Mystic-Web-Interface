import React from 'react';
import { Link } from "react-router-dom";

export function MenuComponent( {
    guilds,

}) {

    return (
        <div>
            <h1>Hello</h1>
            {guilds.included.map((guild) => (
                <div>
                    <li>{guild.name}</li>
                    <Link to={ `/dashboard/${guild.id}` }>View Dashboard</Link>
                </div>
            ))}

            {guilds.excluded.map((guild) => (
                <div>
                    <li>{guild.name}</li>
                    <a href={`https://discord.com/oauth2/authorize?client_id=755513775318368307&permissions=8&scope=bot`}>Invite Bot</a>
                </div>
            ))}
            
        </div>
    );
}