import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import LogoSVG from '../assets/logo.svg';
import useInput from '../hooks/useInput';

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
        justify-content: center;
    }
`;

const StyledLeftContainer = styled.form`
    margin: 5em;
    padding: 5em;
    max-width: 600px;
    min-height: 600px;

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

const StyledRightContainer = styled.div`
    align-items: center;
`;

const LoginButton = styled.button`
    background-color: #31b5ab;
    border: 1px solid #10a599;
    padding: .5em 2em;
    color: #fff;
    border-radius: 2em;
    cursor: pointer;
`;

const SignupLink = styled(Link)`
    color: #31b5ab;
`;

const StyledRightLogo = styled(LogoSVG)`
    max-width: 600px;
    margin-right: 2em;
`;

function Login() {
    const email = useInput();
    const password = useInput();
    const history = useHistory();
    const formRef = useRef(null);

    async function login(e) {
        e.preventDefault();

        if (!formRef.current.reportValidity()) return;

        let response = await fetch('http://localhost:8000/users', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        });

        let json = await response.json();

        if (json.token) {
            localStorage.setItem('token', json.token);

            history.push('/notes');
        }

    }

    
    return (
        <>
            <StyledHeader>
                <StyledLogo />
            </StyledHeader>
            <StyledContainer>
                <StyledLeftContainer ref={formRef}>
                    <h1>Se connecter</h1>
                    <input required {...email} type="email" placeholder="Entrez votre email" />
                    <input required {...password} type="password" placeholder="Entrez votre mot de passe" />
                    <LoginButton onClick={login}>Se connecter</LoginButton>
                    <SignupLink as={Link} to="/signup">Créer un compte</SignupLink>
                </StyledLeftContainer>
                <StyledRightContainer>
                    <StyledRightLogo />
                </StyledRightContainer>
            </StyledContainer>
        </>
    );
}

export default Login;