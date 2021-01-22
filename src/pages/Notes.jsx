import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import TextBloc from '../components/TextBloc';
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
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f6f5f4;
    user-select: none;
    cursor: text;
`;

const BaseNote = styled(Link)`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;
    color: black;
    text-decoration: none;

    &:hover{
        background-color: WhiteSmoke;
        cursor: pointer;
    }
`;

const StyledNewNoteButton = styled(BaseNote)`

`;

const StyledNewNoteNameInput = styled(BaseNote)`
    visibility: collapse;
    background-color: rgba(16, 165, 153, 0.05);
    border: 5px solid white;
`;

const StyledNote = styled(BaseNote)`
    &.active{
        background-color: rgba(16, 165, 153, 0.3);
    }
`;

function Notes(props) {

    const drawArea = useRef(null);
    const newNoteNameInputRef = useRef(null);


    const [note, setNote] = useState({
        name: 'Ma première note',
        parts: [],
    });

    const [notes, setNotes] = useState([]);
    const { id: noteId } = useParams();

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(14);
    const [fontBold, setFontBold] = useState(false);
    const [fontItalic, setFontItalic] = useState(false);
    const [fontUnderline, setFontUnderline] = useState(false);
    const [fontColor, setFontColor] = useState('#000');
    const [selectedPart, setSelectedPart] = useState(false);

    // on noteId change
    useEffect(() => {
        getNotes();
        switchToNote(noteId);
    }, [noteId]);

    function createTextBloc(evt) {
        const { x, y } = drawArea.current.getBoundingClientRect();

        setNote({
            ...note, parts: [
                ...note.parts,
                {
                    type: 'text',
                    content: '',
                    position: {
                        x: evt.clientX - x,
                        y: evt.clientY - y
                    },
                    meta: {
                        fontFamily,
                        fontSize,
                        fontBold,
                        fontItalic,
                        fontUnderline,
                        fontColor
                    }
                }
            ]
        });
    }

    function updateTextBloc(textBloc) {

    }

    function deleteTextBloc(textBloc) {
        setNote({
            ...note,
            parts: note.parts.filter(part => part != textBloc),
        });
    }

    function handleSelect(textBloc) {
        setSelectedPart(textBloc);
    }

    function handleSettingChange(type, value) {
        switch (type) {
            case 'fontFamily':
                setFontFamily(value);
                break;
            case 'fontSize':
                setFontSize(value);
                break;
            case 'fontBold':
                setFontBold(value);
                break;
            case 'fontItalic':
                setFontItalic(value);
                break;
            case 'fontUnderline':
                setFontUnderline(value);
                break;
            case 'fontColor':
                setFontColor(value);
                break;
        }
    }

    function newNoteButtonPressed() {
        newNoteNameInputRef.current.text = "";
        newNoteNameInputRef.current.style.visibility = "visible";
        newNoteNameInputRef.current.focus();
    }
    
    async function getNotes() {
        let response = await fetch("http://localhost:8000/notes", {method: "GET"});
        let json = await response.json();
        setNotes(json);
    }

    async function switchToNote(nid) {
        if(!nid)
            return;

        let response = await fetch("http://localhost:8000/notes/" + nid, {method: "GET"});
        let json = await response.json();

        console.log(json);

        setNote(json);
    }

    async function newNoteInputKeyPress(event) {
        if (event.charCode == 13) {
            event.preventDefault();

            let elem = newNoteNameInputRef.current;
            if (elem.text.length === 0)
                return;

            await fetch("http://localhost:8000/notes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': elem.text,
                    'children': []
                })
            })
                .then(response => response.json())
                .then(data => {
                    getNotes();
                    props.history.push("/notes/" + data["_id"]);
                    elem.style.visibility = "collapse";
                });
        }
    }

    return (
        <StyledNotesContainer>
            <Toolbar
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontBold={fontBold}
                fontItalic={fontItalic}
                fontUnderline={fontUnderline}
                fontColor={fontColor}
                onSettingChange={handleSettingChange}
                noteName={note.name} />
            <StyledContainer>
                <StyledLeftContainer>
                    <StyledNewNoteButton onClick={newNoteButtonPressed}>
                        + Nouvelle note
                        </StyledNewNoteButton>
                    <StyledNewNoteNameInput ref={newNoteNameInputRef}
                        contentEditable="true"
                        onKeyPress={newNoteInputKeyPress}
                    ></StyledNewNoteNameInput>
                    {notes.map(note => <StyledNote as={NavLink} to={"/notes/" + note._id}>
                        {note.name}
                    </StyledNote>)}
                </StyledLeftContainer>
                <StyledDrawArea ref={drawArea} onClick={createTextBloc}>
                    {note.parts.map((part, i) => <TextBloc key={i}
                        handleUpdate={updateTextBloc}
                        handleDelete={deleteTextBloc}
                        handleSelect={handleSelect}
                        isSelected={selectedPart == part}
                        part={part}
                        noteId={noteId}
                        container={drawArea} />)}
                </StyledDrawArea>
            </StyledContainer>
        </StyledNotesContainer>
    );
}

export default Notes;