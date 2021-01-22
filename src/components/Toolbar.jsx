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
                <select name="font" id="" onChange={evt => onSettingChange('onFontChange', evt.target.value)}>
                    {fonts.map((font, i) => <option key={i} name={font}>{font}</option>)}
                </select>
                <input defaultValue={fontSize} type="number" onBlur={evt => onSettingChange('onFontSizeChange', evt.target.value)} onSubmit={evt => onFontSizeChange(evt.target.value)} />
                <ToggleButton defaultValue={fontBold} onChange={isToggled => onSettingChange('onFontBoldChange', isToggled)}>B</ToggleButton>
                <ToggleButton defaultValue={fontItalic} onChange={isToggled => onSettingChange('onFontItalicChange', isToggled)}>I</ToggleButton>
                <ToggleButton defaultValue={fontUnderline} onChange={isToggled => onSettingChange('onFontUnderlineChange', isToggled)}>U</ToggleButton>
                <ColorPicker />
            </StyledToolBar>
        </div>
    );
}

export default Toolbar;