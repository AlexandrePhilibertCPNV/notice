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

const StyledNewNoteButton = styled(BaseNote)`

`;

const StyledNewNoteNameInput = styled(BaseNote)`
    visibility: collapse;
    background-color: rgba(16, 165, 153, 0.05);
    border: 5px solid white;
`;

const StyledNote = styled(BaseNote)`
    &.active{
        background-color: rgba(16, 165, 153, 0.3);
    }
`;

export default class Notes extends React.Component { 
    constructor (props){
        super(props);
        
        this.state = {
            notes: []
        };
        this.newNoteNameInputRef = React.createRef();
    }

    newNote(){
        this.newNoteNameInputRef.current.text = "";
        this.newNoteNameInputRef.current.style.visibility = "visible";
        this.newNoteNameInputRef.current.focus();
    }

    getNotes() {
        fetch("http://localhost:8000/notes", {method: "GET"})
            .then(response => response.json())
            .then(data => { console.log(data); this.setState({notes: data}) } );
    }

    componentDidMount() {
        this.getNotes();
    }

    keyPress(event) {
        if(event.charCode == 13) {
            event.preventDefault();
            
            let elem = this.newNoteNameInputRef.current;
            if(elem.text.length === 0)
                return;
            
            fetch("http://localhost:8000/notes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': elem.text,
                    'children': []
                })
            })
            .then(response => response.json())
            .then(data => {
                this.getNotes();
                this.props.history.push("/notes/" + data["_id"]);
                elem.style.visibility = "collapse";
            });
        }
    }

    render() {
        return (
            <StyledNotesContainer>
                <Toolbar />
                <StyledContainer>
                    <StyledLeftContainer>
                        <StyledNewNoteButton onClick={ this.newNote.bind(this) }>
                            + Nouvelle note
                        </StyledNewNoteButton>
                        <StyledNewNoteNameInput ref={this.newNoteNameInputRef}
                            contentEditable="true"
                            onKeyPress={this.keyPress.bind(this)}
                        ></StyledNewNoteNameInput>
                        { this.state.notes.map(note => <StyledNote as={NavLink} to={"/notes/" + note._id}>{note.name}</StyledNote>) }
                    </StyledLeftContainer>
                    <StyledDrawArea>
                    </StyledDrawArea>
                </StyledContainer>
            </StyledNotesContainer>
        );
    }
}