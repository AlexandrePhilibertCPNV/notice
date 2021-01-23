import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AccountSVG from '../assets/account.svg';

const StyledLink = styled(Link)`
    display: block;
    color: #888;
    text-decoration: none;
`;

const StyledAccountMenu = styled.ul`
    display: none;
    position: absolute;
    flex-flow: column wrap;
    list-style: none;
    background-color: #fff;
    padding: 0;
    margin: .25em;
    right: 0;
    z-index: 10;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 5px rgba(50, 50, 50, .2);

    &  > li {
        &:hover {
            background-color: #f7f7f7;
        }

        &:not(:first-child) {
            border-top: 1px solid #ccc;
        }

        & > ${StyledLink} {
            padding: .75em;
        }
    }
`;

const StyledAccountButton = styled.button`
    display: flex;
    margin: .25em;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer; 
`;

const StyledAccountButtonContainer = styled.div`
    ${StyledAccountButton}:focus ~ ${StyledAccountMenu} {
        display: flex;
    }
`;

const StyledAccountSVG = styled(AccountSVG)`
    width: 2em;
    height: 2em;
    fill: #fff;
`;

function AccountButton() {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    function handleClick(evt) {
        setIsActive(!isActive);
        
        if (isActive) {
            ref.current.blur();
        }
    }

    return (
        <StyledAccountButtonContainer>
            <StyledAccountButton ref={ref} onClick={handleClick} title="Mon compte"><StyledAccountSVG /></StyledAccountButton>
            <StyledAccountMenu>
                <li>
                    <StyledLink as={Link} to="/account">Mon compte</StyledLink>
                </li>
                <li>
                    <StyledLink as={Link} to="/logout">Se déconnecter</StyledLink>
                </li>
            </StyledAccountMenu>
        </StyledAccountButtonContainer>
    );
}

export default AccountButton;