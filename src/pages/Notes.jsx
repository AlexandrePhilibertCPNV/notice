import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
    padding: 5em;
    width: 100%;
    height: 100%;
    background-color: #f6f5f4;
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

const StyledNewNote = styled(BaseNote)`

`;

const StyledNote = styled(BaseNote)`
    &.active{
        background-color: rgba(16, 165, 153, 0.3);
    }
`;

export default class Notes extends React.Component { 
    state = {
        notes: []
    };

    componentDidMount() {
        fetch("http://localhost:8000/notes", {method: "GET"})
        .then(response => response.json())
        .then(data => this.setState({notes: data}) );
    }

    render() {
        return (
            <StyledNotesContainer>
                <Toolbar />
                <StyledContainer>
                    <StyledLeftContainer>
                        <StyledNewNote as={Link} to="/">
                            + Nouvelle note
                        </StyledNewNote>
                        { this.state.notes.map(note => <StyledNote as={NavLink} to={"/notes/" + note._id}>{note.name}</StyledNote>) }
                    </StyledLeftContainer>
                    <StyledDrawArea>
                    </StyledDrawArea>
                </StyledContainer>
            </StyledNotesContainer>
        );
    }
}