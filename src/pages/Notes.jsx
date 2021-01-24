import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NoteActionsButton from '../components/NoteActionsButton';

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

    useEffect(() => {
        if (!selectedPart.meta) return;

        setFontFamily(selectedPart.meta.fontFamily);
        setFontSize(selectedPart.meta.fontSize);
        setFontBold(selectedPart.meta.fontBold);
        setFontItalic(selectedPart.meta.fontItalic);
        setFontUnderline(selectedPart.meta.fontUnderline);
        setFontColor(selectedPart.meta.fontColor);

    }, [selectedPart]);

    // on noteId change
    useEffect(() => {
        getNotes();
        switchToNote(noteId);
    }, [noteId]);

    function createTextBloc(evt) {
        // We do not create a new TextBloc if we had another one selected before
        // clicking in the DrawArea
        if (selectedPart) {
            setSelectedPart(false);
            return;
        }

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

    async function deleteTextBloc(textBloc) {
        setNote({
            ...note,
            parts: note.parts.filter(part => part != textBloc),
        });
    }

    function handleSelect(textBloc) {
        setSelectedPart(textBloc);

        setFontFamily(fontFamily);
        setFontSize(fontSize);
        setFontBold(fontBold);
        setFontItalic(fontItalic);
        setFontUnderline(fontUnderline);
        setFontColor(fontColor);
    }

    function handleSettingChange(type, value) {
        // This is bad, but it is faster to write than do it properly :)
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

        setNote({
            ...note,
            parts: [
                ...note.parts.filter(part => part != selectedPart),
                {
                    ...selectedPart,
                    meta: {
                        ...selectedPart.meta,
                        [type]: value
                    }
                }
            ],
        });
    }

    function newNoteButtonPressed() {
        newNoteNameInputRef.current.text = "";
        newNoteNameInputRef.current.style.visibility = "visible";
        newNoteNameInputRef.current.focus();
    }

    async function getNotes() {
        let response = await fetch("http://localhost:8000/notes", { method: "GET" });
        let json = await response.json();
        setNotes(json);
    }

    async function switchToNote(nid) {
        if (!nid)
            return;

        let response = await fetch("http://localhost:8000/notes/" + nid, { method: "GET" });
        let json = await response.json();

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
                    hideNewNoteInput()
                });
        }
    }

    function hideNewNoteInput() {
        newNoteNameInputRef.current.style.visibility = "collapse";
        newNoteNameInputRef.current.text = "";
    }

    async function handleDeleteNote(nid) {
        if (!nid)
            return;

        let response = await fetch("http://localhost:8000/notes/" + nid, { method: "DELETE" });
        let json = await response.json();

        props.history.push("/notes/");
        getNotes();

        console.log(json);
    }

    async function handleRenameNote(nid) {
        if (!nid)
            return;

        let btn = document.querySelector('#note-' + nid);
        btn.setAttribute("contentEditable", "true");
        btn.focus();

        btn.addEventListener('keypress', function (event) {
            if (event.charCode == 13) {
                event.preventDefault();

                fetch("http://localhost:8000/notes/" + nid, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'name': btn.innerText,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        btn.setAttribute("contentEditable", "false");
                    });
            }
        });
        console.log(btn);
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
                        onBlur={hideNewNoteInput}
                    ></StyledNewNoteNameInput>
                    {notes.map(note => <StyledNote as={NavLink} to={"/notes/" + note._id} id={"note-" + note._id}>
                        {note.name}
                        <NoteActionsButton noteId={noteId} handleDeleteNote={handleDeleteNote} handleRenameNote={handleRenameNote} />
                    </StyledNote>)}
                </StyledLeftContainer>
                <StyledDrawArea ref={drawArea} onClick={createTextBloc}>
                    {note.parts.map((part) => <TextBloc key={part._id}
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