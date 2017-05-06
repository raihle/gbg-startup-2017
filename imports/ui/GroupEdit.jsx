import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Quizes } from '../api/quizes.js';
import { QuizGroups } from '../api/quizgroups.js';

export default class GroupEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizName: "",
            quizPlace: "",
            quizDate: "",
            quizMaster: "",

            groupName: "",
            groupDescription: "",
            groupMaxMemberCount: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuizNameChange = this.handleQuizNameChange.bind(this);
        this.handleQuizPlaceChange = this.handleQuizPlaceChange.bind(this);
        this.handleQuizDateChange = this.handleQuizDateChange.bind(this);
        this.handleQuizMasterChange = this.handleQuizMasterChange.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupDescriptionChange = this.handleGroupDescriptionChange.bind(this);
        this.handleGroupMaxMemberCountChange = this.handleGroupMaxMemberCountChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const quiz = {
            name: this.state.quizName,
            place: this.state.quizPlace,
            date: this.state.quizDate,
            quizMaster: this.state.quizMaster
        };

        const group = {
            name: this.state.groupName,
            description: this.state.groupDescription,
            maxMemberCount: this.state.groupMaxMemberCount,
            ownerId: Meteor.userId()
        };

        console.log('Submitting!');
        group.quizId = Quizes.insert(quiz);
        QuizGroups.insert(group);
    }

    handleQuizNameChange(event) {
        this.setState({quizName: event.currentTarget.value});
    }

    handleQuizPlaceChange(event) {
        this.setState({quizPlace: event.currentTarget.value});
    }

    handleQuizDateChange(event) {
        this.setState({quizDate: event.currentTarget.value});
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

    handleGroupMaxMemberCountChange(event) {
        this.setState({groupMaxMemberCount: event.currentTarget.value});
    }

    render() {
        return (
            <div className="group-edit">
                <h1>Skapa en grupp</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Vad heter quizet?
                        <input
                            type="text"
                            value={this.state.quizName}
                            onChange={this.handleQuizNameChange}
                        />
                    </label>
                    <label>
                        Var ligger det?
                        <input
                            type="text"
                            value={this.state.quizPlace}
                            onChange={this.handleQuizPlaceChange}
                        />
                    </label>
                    <label>
                        När är det?
                        <input
                            type="text"
                            value={this.state.quizDate}
                            onChange={this.handleQuizDateChange}
                        />
                    </label>
                    <label>
                        Vem är QuizMaster?
                        <input
                            type="text"
                            value={this.state.quizMaster}
                            onChange={this.handleQuizMasterChange}
                        />
                    </label>
                    <hr />
                    <label>
                        Vad heter din grupp?
                        <input
                            type="text"
                            value={this.state.groupName}
                            onChange={this.handleGroupNameChange}
                        />
                    </label>
                    <label>
                        Hur många vill ni bli?
                        <input
                            type="number"
                            value={this.state.groupMaxMemberCount}
                            onChange={this.handleGroupMaxMemberCountChange}
                        />
                    </label>
                    <label>
                        Skriv lite mer om er själva!
                        <textarea
                            rows="4"
                            type="text"
                            value={this.state.groupDescription}
                            onChange={this.handleGroupDescriptionChange}
                        />
                    </label>
                    <button type="submit">
                        Skapa!
                    </button>
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