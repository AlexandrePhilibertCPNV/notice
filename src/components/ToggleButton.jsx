import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledToggleButton = styled.button`
    cursor: pointer;
    
    ${props => props.isActive && css`
        background-color: red;
    `}
`;

function ToggleButton({ children, onChange, defaultValue }) {
    const [isActive, setIsActive] = useState(defaultValue);

    function handleClick() {
        setIsActive(!isActive);
        onChange(isActive);
    }

    return (
        <StyledToggleButton isActive={isActive} onClick={handleClick}>{children}</StyledToggleButton>
    );
}

export default ToggleButton;