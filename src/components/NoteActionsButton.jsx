import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import NoteActionsSVG from '../assets/menu_dots.svg';

const StyledLink = styled.button`
    display: block;
    color: #888;
    text-decoration: none;
    border: none;

`;

const StyledNoteActionsMenu = styled.ul`
    display: none;
    position: absolute;
    flex-flow: column wrap;
    list-style: none;
    background-color: #fff;
    padding: 0;
    margin: .25em;
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

const StyledNoteActionsButton = styled.button`
    display: flex;
    margin: .25em;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer; 
`;

const StyledNoteActionsButtonContainer = styled.div`
    ${StyledNoteActionsButton}.open ~ ${StyledNoteActionsMenu} {
        display: flex;
    }
    float: right;
`;

const StyledNoteActionsSVG = styled(NoteActionsSVG)`
    width: 1em;
    height: 1em;
    fill: #000;
`;

function NoteActionsButton({handleDeleteNote, handleRenameNote, noteId}) {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    function handleClick(evt) {
        setIsActive(!isActive);

        console.log(isActive);
        
        if (isActive) {
            ref.current.blur();
            ref.current.classList.add("open");
        }
        else {
            ref.current.classList.remove("open");
        }
    }

    function onRenameButtonClick() {
        handleRenameNote(noteId);
        ref.current.classList.remove("open");
    }

    function onDeleteButtonClick() {
        handleDeleteNote(noteId);
        ref.current.classList.remove("open");
    }

    return (
        <StyledNoteActionsButtonContainer>
            <StyledNoteActionsButton ref={ref} onClick={handleClick}>
            <StyledNoteActionsSVG /></StyledNoteActionsButton>
            <StyledNoteActionsMenu>
                <li>
                    <StyledLink onClick={onRenameButtonClick}>Renommer</StyledLink>
                </li>
                <li>
                    <StyledLink onClick={onDeleteButtonClick}>Supprimer</StyledLink>
                </li>
            </StyledNoteActionsMenu>
        </StyledNoteActionsButtonContainer>
    );
}

export default NoteActionsButton;