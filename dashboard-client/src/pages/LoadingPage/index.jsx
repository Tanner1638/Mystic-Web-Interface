import React from 'react';
import styled from '@emotion/styled';
import { LoadingModule } from '../../components';

const {PORT, REACT_PORT, IP_ADDRESS} = require('../../environment');
const Button = styled.button`
  color: turquoise;
`;

//point to backend function
export function LoadingPage(props) {
    return (
    <html>
      <head>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
        <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cinzel+Decorative:400,700,900|Quicksand:300,400,500,600,700" />
      </head>
      
      <body class="u-body u-overlap">
        <LoadingModule/>
      </body>
    </html>
    );
}