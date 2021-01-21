import React, { useState } from 'react';
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
    height: auto;
    flex-flow: row no-wrap;

    & > * {
        display: flex;
        flex-flow: column wrap;
        /* flex: 1 1 50%; */

    }
`;

const StyledLeftContainer = styled.div`
    padding: 2em 1em;
    width: 200px;
    min-height: 100%;
    border-right: 1px solid #e4e4e4;
`;

const StyledRightContainer = styled.div`
    padding: 5em;
    width: auto;
`;

const StyledNewNote = styled.div`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;
`;

const StyledNote = styled.div`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;
`;

function Notes() {
    return (
        <>
            <StyledHeader>
                <StyledLogo />
            </StyledHeader>
            <StyledContainer>
                <StyledLeftContainer>
                    <StyledNewNote>
                        + Nouvelle note
                    </StyledNewNote>
                    <StyledNote>
                        Note 1
                    </StyledNote>
                    <StyledNote>
                        Note sur plein de choses de math
                    </StyledNote>
                    <StyledNote>
                        Note 3
                    </StyledNote>
                </StyledLeftContainer>
                <StyledRightContainer>
                    Mettre le document ouvert ici
                </StyledRightContainer>
            </StyledContainer>
        </>
    );
}

export default Notes;
