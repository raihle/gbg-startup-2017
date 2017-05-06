import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

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
                    <input
                        placeholder="Namn"
                        type="text"
                        value={member.name}
                        onChange={changeListener}
                    />
                    <button type="button" onClick={deleteListener}>&times;</button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="group-preexisting-member">
                <ul>
                    {this.renderMembers()}
                </ul>
                <button type="button" onClick={this.handleNewRow}>Ny medlem</button>
            </div>
        );
    }
}

GroupMemberListEdit.propTypes = {
    members: PropTypes.array.isRequired,
};
