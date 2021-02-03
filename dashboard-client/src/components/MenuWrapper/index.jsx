import React from 'react';
import { Link } from "react-router-dom";

export function MenuComponent( {
    guilds,

}) {

    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
                <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900" />
            </head>
            
            <body class="u-body u-stick-footer">
                <header class="u-align-left u-clearfix u-custom-color-1 u-header u-header" id="sec-cce3">
                <div class="u-clearfix u-sheet u-sheet-1"></div>
            </header>

            <section class="u-clearfix u-valign-middle-xl u-section-1" id="sec-c3a5">
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                    <div class="u-container-layout u-valign-middle u-container-layout-1">
                    <h2 class="u-align-center u-text u-text-1">Please Select a server</h2>
                    </div>
                </div>
            </section>


            

                <section class="u-clearfix menu-section-2 u-valign-middle-sm u-valign-middle-xs">


                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <div class="u-list u-repeater u-list-1">
                            
                            {guilds.included.map((guild) => (
                            <div class="u-container-style u-list-item u-repeater-item u-list-item-1 u-custom-color-5">
                                <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1 u-custom-color-2">
                                    <p class="u-text u-text-1">{guild.name}</p>
                                    <Link class="u-btn u-btn-round u-button-style u-radius-10 u-btn-1 " to={ `/dashboard/${guild.id}` }>View Dashboard</Link>
                                    {guild.icon &&
                                        <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} alt="" class="u-image u-image-default u-image-1" data-image-width="740" data-image-height="740"></img>
                                        }
                                    {!guild.icon &&
                                        <span class="dot u-valign-middle">
                                        <p class="u-align-center">{guild.name.match(/\b(\w)/g)}</p>
                                    </span>
                                    }
                                
                                </div>
                            </div>
                            ))}
                            
                            {guilds.excluded.map((guild) => (
                                <div class="u-container-style u-list-item u-repeater-item u-list-item-1 u-custom-color-3">
                                    <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1">
                                        <p class="u-text u-text-1">{guild.name}</p>
                                        <a class="u-btn u-btn-round u-button-style u-radius-10 u-btn-1" href={`https://discord.com/oauth2/authorize?client_id=755513775318368307&permissions=8&scope=bot`}>Invite Bot</a>
                                        {guild.icon &&
                                            <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} alt="" class="u-image u-image-default u-image-1" data-image-width="740" data-image-height="740"></img>
                                        }
                                        {!guild.icon &&
                                            <span class="dot u-valign-middle">
                                                <p class="u-align-center">{guild.name.match(/\b(\w)/g)}</p>
                                            </span>
                                        }
                                        
                                    </div>
                                </div>
                            ))}
                            
                        </div>


                    </div>
                </section>
                <div>

                </div>
            
                
            </body>
        </html>
    );
}