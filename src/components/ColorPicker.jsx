import React from 'react';
import styled from 'styled-components';

import ExpandSVG from '../assets/expand.svg';

const StyledColorContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    max-width: 250px;
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

function ColorPicker() {

    return (
        <div>
            <button>A</button>
            <button><ExpandSVG /></button>
            <StyledColorContainer>
                {colors.map((color, i) => <StyledColoredButton key={i} style={{ backgroundColor: color }} />)}
            </StyledColorContainer>
        </div>
    );
}

export default ColorPicker;