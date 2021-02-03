import React from 'react';
import styled from '@emotion/styled'

const {PORT, REACT_PORT, IP_ADDRESS} = require('../../environment');
const Button = styled.button`
  color: turquoise;
`

//point to backend function
export function LandingPage(props) {
  // Popup window code
    
    
    const login = () => window.location.href = `http://${IP_ADDRESS}:2999/api/auth/discord`;
    return (
    <html>
      <head>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
        <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
        
      </head>

      <body class="u-body u-overlap">

        <nav class="u-body u-overlap">
          <header class="u-align-center u-clearfix u-custom-color-1 u-header u-header">
            <div class="u-clearfix u-sheet u-sheet-1">
            </div>
          </header>
        </nav>
        

        <section class="skrollable u-clearfix home-section-1" id="sec-ffeb">
          <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <h1 class="u-align-center u-custom-font u-text u-text-1">Mystic's Chaos Bot</h1>
            <p class="u-align-center u-custom-font u-text u-text-2">Fully Functional Discord Bot. Includes Moderation, Reaction Roles, Music Features, and more. 100% customizable and secure.</p>
            <a onClick={login} class="u-btn u-btn-round u-button-style u-custom-color-1 u-hover-custom-color-4 u-radius-50 u-btn-1">Get started</a>
          </div>
          
        </section>
        
        
      </body>
      
    </html>
    )
}