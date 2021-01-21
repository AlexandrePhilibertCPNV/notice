import React from 'react';
import styled from 'styled-components';

import Toolbar from '../components/Toolbar';

const StyledNotesContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 100%;

    & > * {
        display: flex;
        flex-flow: column wrap;
    }
`;

const StyledLeftContainer = styled.div`
    padding: 1em 0;
    width: 200px;
    height: 100%;
    border-right: 1px solid #e4e4e4;
`;

const StyledDrawArea = styled.div`
    padding: 5em;
    width: 100%;
    height: 100%;
    background-color: #f6f5f4;
    cursor: text;
`;

const BaseNote = styled.a`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;

    &:hover{
        background-color: WhiteSmoke;
        cursor: pointer;
    }
`;

const StyledNewNote = styled(BaseNote)`

`;

const StyledNote = styled(BaseNote)`
    &.active{

    }
`;

function NewNote(){
    alert('Ajouter une nouvelle note');
}

function Notes() {
    return (
        <StyledNotesContainer>
            <Toolbar />
            <StyledContainer>
                <StyledLeftContainer>
                    <StyledNewNote onClick={NewNote}>
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
                <StyledDrawArea>

                </StyledDrawArea>
            </StyledContainer>
        </StyledNotesContainer>
    );
}

export default Notes;
