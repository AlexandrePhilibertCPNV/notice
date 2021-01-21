import React from 'react';
import styled from 'styled-components';

import Toolbar from '../components/Toolbar';

const StyledNoteContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
`;

const StyledNoteArea = styled.div`
    flex: 1 0;
    cursor: text;
`;

function Note() {

    return (
        <StyledNoteContainer>
            <Toolbar />
            <StyledNoteArea>

            </StyledNoteArea>
        </StyledNoteContainer>
    );
}

export default Note;