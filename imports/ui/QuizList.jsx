import React, { Component } from 'react';
import moment from 'moment';
import Quiz from './Quiz.jsx';
import { Quizes } from '../api/quizes.js';
import {AppBar, FlatButton, RaisedButton} from "material-ui";
import AccountsUIWrapper from "./AccountsUIWrapper";


export default class QuizList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        };
        this.nextDay = this.nextDay.bind(this);
        this.previousDay = this.previousDay.bind(this);
    }

    getQuizesByDate(date) {
        let dateString = moment(date).format('YYYY-MM-DD');
        return Quizes.find({date: {$regex: '^' + dateString}});
    }

    renderQuizes(quizes) {
//        if (!quizes.length) {
//            return (<p>Tyvärr ingen quiz idag</p>);
//        }
        return quizes.map((quiz) => (
                    <Quiz key={quiz._id} quiz={quiz} />
                    ));
    }

    renderPrevious() {
        if (this.isToday()) {
            return <RaisedButton disabled={true}>&lt;-</RaisedButton>;
        } else {
            return <RaisedButton onClick={this.previousDay}>&lt;-</RaisedButton>;
        }
    }

    isToday() {
        return moment(this.state.currentDate).isSame(new Date(), 'day');
    }

    nextDay() {
        this.setState({currentDate: moment(this.state.currentDate).add({day: 1}).toDate()});
    }

    previousDay() {
        this.setState({currentDate: moment(this.state.currentDate).subtract({day: 1}).toDate()});
    }

    topRightButton() {
        if (Meteor.userId() !== null) {
            return (
                <FlatButton href="/createGroup">
                    <div className="tight-button-content">Skapa grupp</div>
                </FlatButton>
            );
        } else {
            return (
                <div className="login-button-test">
                    <AccountsUIWrapper />
                </div>
            );
        }
    }

    render() {
        let tmp = Geolocation.currentLocation();
        let quizes = this.getQuizesByDate(this.state.currentDate);

        return (
                <div>
                    <AppBar
                        title="Quizy"
                        titleStyle={{fontStyle: "italic"}}
                        showMenuIconButton={false}
                        iconElementRight={this.topRightButton()}
                    />
                    <header>
                        {this.renderPrevious()}
                        {moment(this.state.currentDate).format('YYYY-MM-DD')}
                        <RaisedButton onClick={this.nextDay}>-&gt;</RaisedButton>
                    </header>
                    <ul>
                        {this.renderQuizes(quizes)}
                    </ul>
                </div>
                );
    }
}