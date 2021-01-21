import React from 'react';
import styled from 'styled-components';

import ColorPicker from './ColorPicker';

const StyledTopBar = styled.div`
    padding: .5em;
    background-color: #31b5ab;
    border-bottom: 1px solid #10a599;
    color: #fff;

    & > h1 {
        margin: 0;
        font-weight: 200;
        font-size: 1.5em;
    }
`;

const StyledToolBar = styled.div`
    background-color: #fcfcfc;
    border-bottom: 1px solid #e4e4e4;
`;

const fonts = [
    'Arial',
    'mono',
    'Roboto',
    'Century Ghotic'
];

function Toolbar({
    onFontChange,
    onFontSizeChange,
    onFontBoldChange,
    onFontItalicChange,
    onFontUnderlineChange,
    onFontColorChange,
    fontFamily,
    fontSize,
    fontBold,
    fontItalic,
    fontUnderline,
    FontColor
}) {

    return (
        <div>
            <StyledTopBar><h1>Notice</h1></StyledTopBar>
            <StyledToolBar>
                <select name="font" id="" onChange={evt => onFontChange(evt.target.value)}>
                    {fonts.map((font, i) => <option key={i} name={font}>{font}</option>)}
                </select>
                <input defaultValue={fontSize} type="number" onBlur={evt => onFontSizeChange(evt.target.value)} onSubmit={evt => onFontSizeChange(evt.target.value)} />
                <button onClick={evt => onFontBoldChange()}>B</button>
                <button onClick={evt => onFontItalicChange()}>I</button>
                <button onClick={evt => onFontUnderlineChange()}>U</button>
                <ColorPicker />
            </StyledToolBar>
        </div>
    );
}

export default Toolbar;