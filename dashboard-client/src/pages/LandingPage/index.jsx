import React from 'react';
import styled from '@emotion/styled'

const {PORT, REACT_PORT, IP_ADDRESS} = require('../../environment');
const Button = styled.button`
  color: turquoise;
`

//point to backend function
export function LandingPage(props) {
    const login = () => window.location.href = `http://${IP_ADDRESS}:2999/api/auth/discord`;
    return (
        <Button onClick={login} >Login</Button>
        
    )
}