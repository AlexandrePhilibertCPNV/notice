import React, { useRef, useState } from 'react';
import styled from 'styled-components';


const StyledAcordionButton = styled.button`
    padding: .25em .5em;
    border: 1px solid #ccc;
    background-color: #eee;
    text-decoration: underline ${props => props.color} 3px;
    cursor: pointer;
`;

const StyledColorContainer = styled.div`
    display: ${props => props.isActive ? 'flex' : 'none'};
    flex-flow: row wrap;
    max-width: 250px;
    position: absolute;
    z-index: 10;
    top: 100%;
    background-color: #fff;
    border: 1px solid #e4e4e4;
    left: -20px;
`;


const StyledColorPicker = styled.div`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;
`;

const StyledColoredButton = styled.button`
    width: 1.5em;
    height: 1.5em;
    padding: 0;
    border: 0;
    margin: .25em;
    cursor: pointer;
`;

const colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
];

function ColorPicker({onChange}) {
    const [color, setColor] = useState('red');
    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    function openContainer(e) {
        setIsActive(!isActive);
        
        if (isActive) {
            ref.current.blur();
        }
    }

    function handleClick(e, color) {
        e.stopPropagation();
        e.preventDefault();

        setColor(color);
        onChange(color);
    
        ref.current.blur();
    }

    return (
        <StyledColorPicker>
            <StyledAcordionButton ref={ref} onClick={openContainer} onBlur={openContainer} color={color}>A</StyledAcordionButton>
            <StyledColorContainer isActive={isActive} >
                {colors.map((color, i) => <StyledColoredButton onMouseDown={e => handleClick(e, color)} key={i} style={{ backgroundColor: color }} />)}
            </StyledColorContainer>
        </StyledColorPicker>
    );
}

export default ColorPicker;