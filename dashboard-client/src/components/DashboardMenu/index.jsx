import React from 'react';
import { Formik } from 'formik';
import  styled  from '@emotion/styled';
//import { Input, Select} from '@emotion/react';
import { updateGuildPrefix } from '../../utils/api';


const Button = styled.button`	
font-size: 0.9375rem;
letter-spacing: 1px;
border-style: none;
font-weight: 700;
text-transform: uppercase;
box-shadow: 0px 5px 20px 0 rgba(0,0,0,0.25);
text-shadow: 0px 0 0px rgba(0,0,0,0);
margin: 10px 0 0 auto;

background-color: #bf3f3f;
`;

export function DashboardMenu({
    history,
    guildId,
    user,
    roles,
    config,
    updatePrefix,
    updateRole,
}) {

    const defaultRoleId = config.defaultRole ? config.defaultRole : "";
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
            </head>
        <body class="u-body u-stick-footer">
            <header class="u-align-left u-clearfix u-custom-color-1 u-header u-header" id="sec-cce3">
                <div class="u-clearfix u-sheet u-sheet-1"></div>
            </header>

            <section class="u-align-center-xs u-clearfix u-valign-middle guild-config-section-1" id="sec-5e8b">
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                    <div class="u-container-layout u-valign-middle u-container-layout-1">
                        <h1 class="u-align-center u-text u-text-1">Manage Server</h1>
                    </div>
                </div>
                <h4 class="u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xl u-text u-text-grey-10 u-text-2">Guild Configurations</h4>
            </section>


            <section class="u-clearfix u-valign-middle-sm u-valign-middle-xs guild-config-section-2" id="sec-98eb">
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                    <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-valign-top-sm u-container-layout-1">
                    <p class="u-align-left u-text u-text-1">Administrator Roles</p>
                    <p class="u-align-left u-text u-text-2">Below are the roles that have the Administrator permission in your server. By default, any role with Administrator permission is considered as a bot master. </p>
                    <div class="u-align-left u-border-2 u-border-custom-color-7 u-container-style u-custom-color-6 u-expanded-width u-group u-radius-5 u-shape-round u-group-2">
                        <div class="u-container-layout u-container-layout-2"></div>
                    </div>
                    <p class="u-align-left u-text u-text-3">Additional Bot Master Roles</p>
                    <p class="u-align-left u-text u-text-4">You can add roles below that will also be considered bot masters, even if they do not have the Administrator permission.</p>
                    <div class="u-align-left u-border-2 u-border-custom-color-7 u-container-style u-custom-color-6 u-expanded-width u-group u-radius-5 u-shape-round u-group-3">
                        <div class="u-container-layout u-container-layout-3">
                        </div>
                    </div>
                    </div>
                </div>
            </section>


            <section class="u-clearfix u-valign-middle-sm u-valign-middle-xs guild-config-section-3" id="carousel_a753">
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                    <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-valign-middle-xs u-container-layout-1">
                        <p class="u-align-left u-text u-text-1">Language</p>
                        <p class="u-align-left u-text u-text-2">Change the default language of Mystic's Simp Bot in your server</p>
                        <div class="u-align-left u-border-2 u-border-custom-color-7 u-container-style u-custom-color-6 u-expanded-width u-group u-radius-5 u-shape-round u-group-2">
                            <div class="u-container-layout u-container-layout-2"></div>
                        </div>
                    </div>
                </div>
            </section>


            <section class="u-clearfix u-valign-middle-xs guild-config-section-4" id="carousel_718f">
            <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-1">
                <p class="u-align-left u-text u-text-1">Commands Prefix</p>
                <p class="u-align-left u-text u-text-2">You can change the prefix used to trigger the bot.</p>
                <Formik
                    initialValues={{ prefix: config.prefix, }}
                    onSubmit={({ prefix }) => {
                        updatePrefix(prefix);
                        setTimeout(function(){window.location.reload();},10);
                        //<a class="u-btn-1" type="submit" children="Update Prefix" /> USE THIS TO PLACE BUTTON WHEN FUNCTIONAL
                    }}
                    >
                    {
                        (props) => (
                            <form onSubmit={props.handleSubmit} class="guild-config-section-1 ">
                                <input type="text" name="prefix" onChange={props.handleChange}  defaultValue={config.prefix} class="u-align-left u-border-2 u-border-custom-color-7 u-container-style u-custom-color-6 u-expanded-width u-group u-radius-5 u-shape-round u-group-2"/>
                             
                            </form>
                        )
                    }
                </Formik>
                <p class="u-align-left u-text u-text-3">Prefix Usage: {config.prefix}help, {config.prefix}test, {config.prefix}kick</p>
                </div>
            </div>
            </section>


            <section class="u-clearfix u-valign-middle-sm u-valign-middle-xs guild-config-section-5" >
            <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-1">
                <div class="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-1 ">
                <p class="u-align-left u-text u-text-1">Default Role</p>
                <p class="u-align-left u-text u-text-2">Change the default role members are assigned to when they join the server</p>
                <Formik
                initialValues={{ defaultRole: defaultRoleId}}
                onSubmit={({ defaultRole }) => {
                    updateRole(defaultRole);
                    
                    setTimeout(function(){window.location.reload();},10);
                    //<a type="submit" children="Update Role" /> USE THIS TO PLACE BUTTON WHEN FUNCTIONAL
                }}
                >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <select name="defaultRole" onChange={props.handleChange} class="u-align-left u-border-2 u-border-custom-color-7 u-container-style u-custom-color-6 u-expanded-width u-group u-radius-5 u-shape-round u-group-2">
                                {roles.map((role) => (
                                    <option value={role.id} selected={role.id === defaultRoleId}>{role.name}</option>
                                ))}
                            </select>
                            <Button type="submit" children="Update Role" />
                        </form>
                    )
                }
                
            </Formik>
                
                </div>
            </div>
            </section>


            <section class="u-clearfix u-custom-color-3 u-valign-middle-sm guild-config-section-6" id="sec-fbd1">
            <div class="u-align-center u-container-style u-expanded-width u-group u-shape-rectangle u-group-1">
                <div class="u-container-layout u-valign-bottom-xl u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-1">
                <p class="u-text u-text-1">Leaderboard Settings</p>
                <div class="u-container-style u-custom-color-5 u-expanded-width-lg u-expanded-width-xl u-group u-shape-rectangle u-group-2">
                    <div class="u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-2">
                    <p class="u-align-center-xs u-text u-text-2">Make my server's leaderboard public</p>
                    <p class="u-text u-text-3">Enabling this option will allow your leaderboard to be seen by anyone who has the link, or by searching your server on Google.</p>
                    </div>
                </div>
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-3">
                    <div class="u-container-layout u-valign-bottom-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-3">
                    <p class="u-align-center-xs u-text u-text-4">Allow users to join your server through the leaderboard</p>
                    <p class="u-text u-text-5">Displays a button to join your server from your leaderboard page.</p>
                    </div>
                </div>
                <div class="u-container-style u-custom-color-5 u-expanded-width u-group u-shape-rectangle u-group-4">
                    <div class="u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-4">
                    <p class="u-align-center-xs u-text u-text-6">Vanity URL</p>
                    <p class="u-text u-text-7">Get a URL customized with your guild name to access your leaderboard.</p>
                    <div class="u-align-right u-container-style u-custom-color-6 u-group u-shape-rectangle u-group-5">
                        <div class="u-container-layout u-container-layout-5"></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            
            
            
            <footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5419">
                <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <p class="u-small-text u-text u-text-variant u-text-1">Copyright 2021 - Tanner Overly</p>
                </div>
            </footer>
        </body>
        </html>
    )
}