import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Quizes } from '../api/quizes.js';
import { QuizGroups } from '../api/quizgroups.js';
import GroupMemberListEdit from './GroupMemberListEdit';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

export default class GroupEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizName: "",
            quizPlace: "",
            quizDate: moment(),
            quizMaster: "",

            groupName: "",
            groupDescription: "",
            groupMissingMemberCount: "",
            groupMembers: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuizNameChange = this.handleQuizNameChange.bind(this);
        this.handleQuizPlaceChange = this.handleQuizPlaceChange.bind(this);
        this.handleQuizDateChange = this.handleQuizDateChange.bind(this);
        this.handleQuizMasterChange = this.handleQuizMasterChange.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupDescriptionChange = this.handleGroupDescriptionChange.bind(this);
        this.handleGroupMissingMemberCountChange = this.handleGroupMissingMemberCountChange.bind(this);
        this.handleMemberChange = this.handleMemberChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const quiz = {
            name: this.state.quizName,
            place: this.state.quizPlace,
            date: this.state.quizDate.format(),
            quizMaster: this.state.quizMaster
        };

        const group = {
            name: this.state.groupName,
            description: this.state.groupDescription,
            missingMemberCount: this.state.groupMissingMemberCount,
            ownerId: Meteor.userId(),
            members: [],
            outsideMembers: this.state.groupMembers
        };

        group.quizId = Quizes.insert(quiz);
        QuizGroups.insert(group);

        window.location= '/';
    }

    handleQuizNameChange(event) {
        this.setState({quizName: event.currentTarget.value});
    }

    handleQuizPlaceChange(event) {
        this.setState({quizPlace: event.currentTarget.value});
    }

    handleQuizDateChange(date) {
        if (typeof date === 'object') {
            this.setState({quizDate: date});
        }
    }

    handleQuizMasterChange(event) {
        this.setState({quizMaster: event.currentTarget.value});
    }

    handleGroupNameChange(event) {
        this.setState({groupName: event.currentTarget.value});
    }

    handleGroupDescriptionChange(event) {
        this.setState({groupDescription: event.currentTarget.value});
    }

    handleGroupMissingMemberCountChange(event) {
        this.setState({groupMissingMemberCount: event.currentTarget.value});
    }

    handleMemberChange(newMembers) {
        this.setState({groupMembers: newMembers});
    }

    render() {
        return (
            <div className="group-edit">
                <ul>
                    <li>
                        <a href="/">Tillbaka</a>
                    </li>
                </ul>
                <h1>Skapa en grupp</h1>
                <form onSubmit={this.handleSubmit}>
                    <label className="form-row">
                        Vad heter quizet?
                        <input
                            className="full-input"
                            type="text"
                            value={this.state.quizName}
                            onChange={this.handleQuizNameChange}
                        />
                    </label>
                    <label className="form-row">
                        Var ligger det?
                        <input
                            className="full-input"
                            type="text"
                            value={this.state.quizPlace}
                            onChange={this.handleQuizPlaceChange}
                        />
                    </label>
                    <label className="form-row">
                        När är det?
                        <div className="full-input">
                            <Datetime
                                value={this.state.quizDate}
                                onChange={this.handleQuizDateChange}
                            />
                        </div>
                    </label>
                    <label className="form-row">
                        Vem är QuizMaster?
                        <input
                            className="full-input"
                            type="text"
                            value={this.state.quizMaster}
                            onChange={this.handleQuizMasterChange}
                        />
                    </label>
                    <hr />
                    <label className="form-row">
                        Vad heter din grupp?
                        <input
                            className="full-input"
                            type="text"
                            value={this.state.groupName}
                            onChange={this.handleGroupNameChange}
                        />
                    </label>
                    <div className="form-row">
                        Vilka andra är redan med i gruppen?
                        <GroupMemberListEdit members={this.state.groupMembers} onChange={this.handleMemberChange} />
                    </div>
                    <label className="form-row">
                        Hur många fler söker ni?
                        <input
                            className="full-input"
                            type="number"
                            value={this.state.groupMissingMemberCount}
                            onChange={this.handleGroupMissingMemberCountChange}
                        />
                    </label>
                    <label className="form-row">
                        Skriv lite mer om er själva!
                        <textarea
                            className="full-input"
                            rows="4"
                            type="text"
                            value={this.state.groupDescription}
                            onChange={this.handleGroupDescriptionChange}
                        />
                    </label>
                    <div className="form-row">
                        <button type="submit">
                            Skapa!
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

GroupEdit.propTypes = {
    group: PropTypes.object,
};

/*
 name: PropTypes.string.isRequired,
 place: PropTypes.string.isRequired,
 date: PropTypes.string.isRequired,
 quizMaster: PropTypes.string.isRequired,
 groupCount: PropTypes.number.isRequired,
 */