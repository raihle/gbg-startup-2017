import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {FlatButton, TextField} from "material-ui";

export default class GroupMemberListEdit extends Component {

    constructor(props) {
        super(props);
        this.handleNewRow = this.handleNewRow.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.handleChangeRow = this.handleChangeRow.bind(this);
    }

    handleNewRow(event) {
        const newMembers = this.props.members.slice();
        newMembers.push({
            name: ''
        });
        this.props.onChange(newMembers);
    }

    handleDeleteRow(event, rowIndex) {
        const newMembers = this.props.members.slice();
        newMembers.splice(rowIndex, 1);
        this.props.onChange(newMembers);
    }

    handleChangeRow(event, rowIndex) {
        const newMembers = this.props.members.slice();
        newMembers[rowIndex] = {
            name: event.currentTarget.value.trim()
        };
        this.props.onChange(newMembers);
    }

    renderMembers() {
        let nextIndex = 0;
        return this.props.members.map((member) => {
            const myIndex = nextIndex;
            nextIndex++;
            const changeListener = (event) => this.handleChangeRow(event, myIndex);
            const deleteListener = (event) => this.handleDeleteRow(event, myIndex);
            return (
                <li key={myIndex}>
                    <h3 className="member-heading">Deltagare #{myIndex + 2}</h3>
                    <TextField
                        floatingLabelText="Namn"
                        value={member.name}
                        onChange={changeListener}
                    />
                    <FlatButton secondary={true} onClick={deleteListener}>
                        <div className="button-content">&times;</div>
                    </FlatButton>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="group-preexisting-member">
                <ul>
                    <li key={-1}>
                        <h3 className="member-heading">Deltagare #1</h3>
                        <TextField
                            floatingLabelText="Namn"
                            value="Jag själv"
                            disabled={true}
                        />
                    </li>
                    {this.renderMembers()}
                </ul>
                <FlatButton primary={true} onTouchTap={this.handleNewRow}>
                    <div className="button-content">+ Lägg till deltagare</div>
                </FlatButton>
            </div>
        );
    }
}

GroupMemberListEdit.propTypes = {
    members: PropTypes.array.isRequired,
};
