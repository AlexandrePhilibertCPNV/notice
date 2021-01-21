import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LogoSVG from '../assets/logo.svg';

const StyledHeader = styled.header`
    padding: .5em;
    border-bottom: 1px solid #e4e4e4;
`;

const StyledLogo = styled(LogoSVG)`
    width: 3em;
    height: 3em;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row no-wrap;

    & > * {
        display: flex;
        flex-flow: column wrap;
        flex: 1 1 50%;

    }
`;

const StyledLeftContainer = styled.div`
    margin: 5em;
    padding: 5em;
    max-width: 600px;

    & > h1 {
        font-size: 2.5em;
        color: #034547;
        margin: .5em 0;
    }

    & > * {
        margin: .75em 0;
    }

    & > input {
        padding: .75em .25em;
    }
`;

const LoginButton = styled.button`
    background-color: #31b5ab;
    border: 1px solid #10a599;
    padding: .5em 2em;
    color: #fff;
    border-radius: 2em;
`;

const SignupLink = styled(Link)`
    color: #31b5ab;
`;

const StyledRightLogo = styled(LogoSVG)`
    width: 75%;
    padding: 7.5em;
`;

function Login() {
    return (
        <>
            <StyledHeader>
                <StyledLogo />
            </StyledHeader>
            <StyledContainer>
                <StyledLeftContainer>
                    <h1>Se connecter</h1>
                    <input type="email" placeholder="Entrez votre email" />
                    <input type="password" placeholder="Entrez votre mot de passe" />
                    <LoginButton>Se connecter</LoginButton>
                    <SignupLink as={Link} to="/signup">Créer un compte</SignupLink>
                </StyledLeftContainer>
                <div>
                    <StyledRightLogo />
                </div>
            </StyledContainer>
        </>
    );
}

export default Login;