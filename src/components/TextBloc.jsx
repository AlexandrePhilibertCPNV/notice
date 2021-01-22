import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import useDragging from '../hooks/useDragging';

const StyledTextBloc = styled.div`
    position: absolute;
    min-width: 100px;
    border: 1px solid #dfdfdf;

    ${props => props.isSelected && css`
        background-color: green;
    `}
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #f9f9f9;
    border-bottom: 1px solid #dfdfdf;
    cursor: move;
`;

const StyledDeleteButton = styled.button`
    height: 1em;
    width: 1em;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 1em;

    &:hover {
        color: red;
    }
`;

const StyledTextContent = styled.div`
    padding: 4px 6px;
`;

function TextBloc(props) {
    const { container, handleSave, handleUpdate, handleDelete, handleSelect, isSelected } = props;

    const textContent = useRef(null);
    const [isDragged, setIsDragged] = useState(false);
    const [part, setPart] = useState(props.part);
    const [ref, x, y, isDragging] = useDragging(part.position);

    useEffect(() => {
        textContent.current.focus();
    }, [textContent]);

    function handleMouseDown() {

    }

    function handleMouseMove(evt) {
        if (!isDragged) return;

        // const { x, y } = container.current.getBoundingClientRect();

        // setPart({
        //     ...part,
        //     position: {
        //         x: evt.clientX - x,
        //         y: evt.clientY - y
        //     }
        // });
    }

    function handleMouseUp() {
        setIsDragged(false);
        handleUpdate(part);
    }

    function handleFocus() {
        handleSelect(part);
    }

    function handleBlur() {
        // We do not want to save an empty text bloc
        if (textContent.current.innerText === '') {
            handleDelete(part);
            return;
        }
    }

    return (
        <StyledTextBloc ref={ref} isSelected={isSelected} onClick={evt => evt.stopPropagation()} style={{ left: x, top: y }}>
            <StyledHeader onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                <StyledDeleteButton onClick={evt => handleDelete(part)} title="Supprimer le bloc de texte">x</StyledDeleteButton>
            </StyledHeader>
            <StyledTextContent onFocus={handleFocus} onBlur={handleBlur} ref={textContent}
                contentEditable suppressContentEditableWarning={true}
                style={{
                    fontFamily: part.meta.fontFamily,
                    color: part.meta.fontColor,
                    fontSize: part.meta.fontSize + 'px',
                    fontWeight: part.meta.fontBold ? 'bold' : 'normal',
                    fontStyle: part.meta.fontItalic ? 'italic' : 'normal',
                    textDecoration: part.meta.fontUnderline ? 'underline' : 'none'
                }}
            >{part.content}</StyledTextContent>
        </StyledTextBloc>
    );
}

export default TextBloc;