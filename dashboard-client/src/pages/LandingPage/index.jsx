import React from 'react';
import styled from '@emotion/styled'
const Button = styled.button`
  color: turquoise;
`
export function LandingPage(props) {
    const login = () => window.location.href = "http://localhost:3001/api/auth/discord";
    return (
        <Button onClick={login} >Login</Button>
        
    )
}