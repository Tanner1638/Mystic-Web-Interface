import React from 'react';
import { Link } from "react-router-dom";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export function MenuComponent( {
    guilds,

}) {

    return (
        <div class="tefst">
            <h1>Menu Component</h1>

            <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="mb-4 mb-lg-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Volt</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users List</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Users List</h4>
                    <p className="mb-0">Your web analytics dashboard template.</p>
                </div>
            </div>




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