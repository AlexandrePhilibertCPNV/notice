import React from 'react';
import styled from 'styled-components';

import ColorPicker from './ColorPicker';
import ToggleButton from './ToggleButton';

const StyledTopBar = styled.div`
    padding: .5em;
    background-color: #31b5ab;
    border-bottom: 1px solid #10a599;
    color: #fff;

    & > h1 {
        margin: 0;
        margin-right: 1em;
        font-weight: 200;
        font-size: 1.5em;
    }

    & > * {
        display: inline-block;
        vertical-align: center;
    }
`;

const StyledToolBar = styled.div`
    background-color: #fcfcfc;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    flex-flow: row nowrap;

    & > * {
        margin: .25em .5em;
    }
`;

const fonts = [
    'Arial',
    'mono',
    'Roboto',
    'Century Ghotic'
];

function Toolbar({
    onSettingChange,
    fontFamily,
    fontSize,
    fontBold,
    fontItalic,
    fontUnderline,
    FontColor,
    noteName
}) {

    return (
        <div onClick={evt => evt.stopPropagation()}>
            <StyledTopBar><h1>Notice</h1><div>{noteName}</div></StyledTopBar>
            <StyledToolBar>
                <select name="font" id="" onChange={evt => onSettingChange('fontFamily', evt.target.value)}>
                    {fonts.map((font, i) => <option key={i} name={font}>{font}</option>)}
                </select>
                <input defaultValue={fontSize} type="number" onBlur={evt => onSettingChange('fontSize', evt.target.value)} onSubmit={evt => onFontSizeChange(evt.target.value)} />
                <ToggleButton style={{ fontWeight: 'bold' }} defaultValue={fontBold}
                    onChange={isToggled => onSettingChange('fontBold', isToggled)}>B</ToggleButton>
                <ToggleButton style={{ fontStyle: 'italic' }} defaultValue={fontItalic}
                    onChange={isToggled => onSettingChange('fontItalic', isToggled)}>I</ToggleButton>
                <ToggleButton style={{ textDecoration: 'underline' }} defaultValue={fontUnderline}
                    onChange={isToggled => onSettingChange('fontUnderline', isToggled)}>U</ToggleButton>
                <ColorPicker onChange={color => onSettingChange('fontColor', color)} />
            </StyledToolBar>
        </div>
    );
}

export default Toolbar;