import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledToggleButton = styled.button`
    margin: .25em;
    padding: .25em .5em;
    width: 2em;
    border: 1px solid #ccc;
    background-color: #eee;
    cursor: pointer;
    
    ${props => props.isActive && css`
        background-color: red;
    `}
`;

function ToggleButton({ children, onChange, defaultValue, ...props }) {
    const [isActive, setIsActive] = useState(defaultValue);

    function handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        
        setIsActive(!isActive);
        // This should not be inverted, but it works ??
        onChange(!isActive);
    }

    return (
        <StyledToggleButton isActive={isActive} onClick={handleClick} {...props}>{children}</StyledToggleButton>
    );
}

export default ToggleButton;