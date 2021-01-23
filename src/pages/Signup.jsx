import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import useInput from '../hooks/useInput';

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
        justify-content: center;
    }
`;

const StyledLeftContainer = styled.form`
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

const StyledRightContainer = styled.div`
    align-items: center;
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
    max-width: 600px;
    margin-right: 2em;
`;

function Signup() {

    const formRef = useRef(null);

    const [passwordMatch, setPasswordMatch] = useState(true);
    const firstname = useInput();
    const lastname = useInput();
    const email = useInput();
    const password = useInput();
    const passwordConfirm = useInput();
    const history = useHistory();

    async function signup(e) {
        e.preventDefault();
        
        setPasswordMatch(password.value === passwordConfirm.value);

        if (!formRef.current.reportValidity()) return;
        if (!passwordMatch) return;

        let response = await fetch('http://localhost:8000/users', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
            }),
        });

        let json = await response.json();

        history.push('/login');
    }

    return (
        <>
            <StyledHeader>
                <StyledLogo />
            </StyledHeader>
            <StyledContainer>
                <StyledLeftContainer ref={formRef}>
                    <h1>Créer un compte</h1>
                    <input required {...firstname} type="text" placeholder="Entrez votre prénom" />
                    <input required {...lastname} type="text" placeholder="Entrez votre nom" />
                    <input required {...email} type="email" placeholder="Entrez votre email" />
                    <input required {...password} type="password" placeholder="Entrez votre mot de passe" />
                    <input required {...passwordConfirm} type="password" placeholder="Confirmez votre mot de passe" />
                    {passwordMatch ? null : <div>les mots de passe ne correspondent pas</div>}
                    <LoginButton onClick={e => signup(e)}>Créer un compte</LoginButton>
                    <SignupLink as={Link} to="/login">Se connecter</SignupLink>
                </StyledLeftContainer>
                <StyledRightContainer>
                    <StyledRightLogo />
                </StyledRightContainer>
            </StyledContainer>
        </>
    );
}

export default Signup;