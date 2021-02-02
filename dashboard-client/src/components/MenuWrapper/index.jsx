import React from 'react';
import { Link } from "react-router-dom";

export function MenuComponent( {
    guilds,

}) {

    return (
        <html>
            <head>
                <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
                <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900" />
            </head>
            
            <body class="u-body u-stick-footer">
                <header class="u-align-center u-clearfix u-custom-color-1 u-header u-header">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    </div>
                </header>

                <section class="u-clearfix u-valign-middle " id="sec-c3a5">
                    <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                        <div class="u-container-layout u-valign-middle u-container-layout-1">
                            <h2 class="u-align-center u-text u-text-1">Please Select a server</h2>
                        </div>
                    </div>
                </section>

                <section class="u-clearfix u-section-2  ">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1 ">



                        <div class="u-list u-repeater u-list-1">
                            {guilds.included.map((guild) => (
                            <div class="u-container-style u-list-item u-repeater-item u-list-item-1">
                                <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1">
                                    
                                    <p class="u-text u-text-1">{guild.name}</p>
                                    <Link class="u-btn u-btn-round u-button-style u-radius-10 u-btn-1" to={ `/dashboard/${guild.id}` }>View Dashboard</Link>
                                
                                </div>
                            </div>
                            ))}
                            
                            {guilds.excluded.map((guild) => (
                                <div class="u-container-style u-list-item u-repeater-item u-list-item-1">
                                    <div class="u-container-layout u-similar-container u-valign-bottom u-container-layout-1">
                                        <p class="u-text u-text-1">{guild.name}</p>
                                        <a class="u-btn u-btn-round u-button-style u-radius-10 u-btn-1" href={`https://discord.com/oauth2/authorize?client_id=755513775318368307&permissions=8&scope=bot`}>Invite Bot</a>
                                    </div>
                                </div>
                            ))}
                            
                        </div>


                    </div>
                </section>
                <div>

                </div>
            
                
            </body>
            <footer class="u-align-center u-clearfix u-grey-80 footerr u-footer">
                    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                        <p class="u-small-text u-text u-text-variant u-text-1">Copyright 2021 - Tanner Overly</p>
                    </div>
                </footer>
        </html>
    );
}