import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Quizes } from '../api/quizes.js';
import { QuizGroups } from '../api/quizgroups.js';
import GroupMemberListEdit from './GroupMemberListEdit';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import {DatePicker, FlatButton, RaisedButton, TextField, TimePicker} from "material-ui";


export default class GroupEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizName: "",
            quizPlace: "",
            quizDate: new Date(),
            quizMaster: "",

            groupName: "",
            groupDescription: "",
            groupMissingMemberCount: "",
            groupMembers: [],

            created: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuizNameChange = this.handleQuizNameChange.bind(this);
        this.handleQuizPlaceChange = this.handleQuizPlaceChange.bind(this);
        this.handleQuizDateChange = this.handleQuizDateChange.bind(this);
        this.handleQuizTimeChange = this.handleQuizTimeChange.bind(this);
        this.handleQuizMasterChange = this.handleQuizMasterChange.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupDescriptionChange = this.handleGroupDescriptionChange.bind(this);
        this.handleGroupMissingMemberCountChange = this.handleGroupMissingMemberCountChange.bind(this);
        this.handleMemberChange = this.handleMemberChange.bind(this);
        this.handleShowGroup = this.handleShowGroup.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const quiz = {
            name: this.state.quizName,
            place: this.state.quizPlace,
            date: moment(this.state.quizDate).format(),
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

        this.setState({created: true});
    }

    handleQuizNameChange(event) {
        this.setState({quizName: event.currentTarget.value});
    }

    handleQuizPlaceChange(event) {
        this.setState({quizPlace: event.currentTarget.value});
    }

    handleQuizDateChange(nothing, date) {
        const newDate = moment(date);
        newDate.hours(this.state.quizDate.getHours());
        newDate.minutes(this.state.quizDate.getMinutes());
        if (typeof date === 'object') {
            this.setState({quizDate: newDate.toDate()});
        }
    }

    handleQuizTimeChange(nothing, time) {
        if (typeof date === 'object') {
            this.setState({quizDate: time});
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

    handleShowGroup(event) {
        window.location = '/';
    }

    handleBack(event) {
        window.location= '/';
    }

    render() {
        if (this.state.created) {
            return (
                <div className="group-edit-finished">
                    <h1 className="centered-text">High five!</h1>
                    <p className="centered-text">Din grupp har skapats och andra användare kan nu se den. Ni får en notis om någon vill gå med!</p>
                    <div className="centered-button">
                        <RaisedButton onTouchTap={this.handleShowGroup} primary={true}>
                            <div className="button-content">Se din grupp</div>
                        </RaisedButton>
                    </div>

                    <div className="centered-button">
                        <RaisedButton onTouchTap={this.handleBack} secondary={true}>
                            <div className="button-content">Tillbaka till quiz-listan</div>
                        </RaisedButton>
                    </div>
                </div>
            );
        }
        return (
            <div className="group-edit">
                <h1>Skapa en grupp</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        floatingLabelText="Vad heter quizet?"
                        onChange={this.handleQuizNameChange}
                        value={this.state.quizName}
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Var ligger det?"
                        onChange={this.handleQuizPlaceChange}
                        value={this.state.quizPlace}
                        fullWidth={true}
                    />

                    <DatePicker
                        floatingLabelText="När är det?"
                        fullWidth={true}
                        locale="sv"
                        value={this.state.quizDate}
                        onChange={this.handleQuizDateChange}
                        DateTimeFormat={Intl.DateTimeFormat}
                    />
                    <TimePicker
                        floatingLabelText="Vilken tid?"
                        fullWidth={true}
                        value={this.state.quizDate}
                        onChange={this.handleQuizTimeChange}
                        format="24hr"
                    />
                    <TextField
                        floatingLabelText="Vem är QuizMaster?"
                        onChange={this.handleQuizMasterChange}
                        value={this.state.quizMaster}
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Vad heter din grupp?"
                        onChange={this.handleGroupNameChange}
                        value={this.state.groupName}
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Hur många fler söker ni?"
                        type="number"
                        onChange={this.handleGroupMissingMemberCountChange}
                        value={this.state.groupMissingMemberCount}
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Skriv lite mer om er själva!"
                        multiLine={true}
                        rowsMax={10}
                        rows={3}
                        onChange={this.handleGroupDescriptionChange}
                        value={this.state.groupDescription}
                        fullWidth={true}
                    />
                    <GroupMemberListEdit members={this.state.groupMembers} onChange={this.handleMemberChange} />
                    <FlatButton href="/" secondary={true} style={{float: "left"}}>
                        <div className="button-content">AVBRYT</div>
                    </FlatButton>
                    <RaisedButton type="submit" primary={true} style={{float: "right"}}>
                        <div className="button-content">SKAPA GRUPP</div>
                    </RaisedButton>
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