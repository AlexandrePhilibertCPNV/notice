import React, { useRef, useState } from 'react';
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
    padding: 2em 1em;
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

const StyledNewNote = styled.div`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;
`;

const StyledNote = styled.div`
    padding: 1em;
    border-bottom: 1px solid #e4e4e4;
`;

function Notes() {

    const drawArea = useRef(null);

    const [note, setNote] = useState({
        name: 'Ma première note',
        parts: [],
    });

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(12);
    const [fontBold, setFontBold] = useState(false);
    const [fontItalic, setFontItalic] = useState(false);
    const [fontUnderline, setFontUnderline] = useState(false);
    const [fontColor, setFontColor] = useState('#000');

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
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        bold: fontBold,
                        italic: fontItalic,
                        underline: fontUnderline,
                        color: fontColor
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

    return (
        <StyledNotesContainer>
            <Toolbar
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontBold={fontBold}
                fontItalic={fontItalic}
                fontUnderline={fontUnderline}
                fontColor={fontColor}
                onFontChange={setFontFamily} onFontSizeChange={setFontSize}
                onFontBoldChange={setFontBold} onFontItalicChange={setFontItalic}
                onFontUnderlineChange={setFontUnderline} onFontColorChange={setFontColor} />
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
                <StyledDrawArea ref={drawArea} onClick={createTextBloc}>
                    {note.parts.map((part, i) => <TextBloc key={i}
                        handleUpdate={updateTextBloc}
                        handleDelete={deleteTextBloc} part={part}
                        container={drawArea} />)}
                </StyledDrawArea>
            </StyledContainer>
        </StyledNotesContainer>
    );
}

export default Notes;
