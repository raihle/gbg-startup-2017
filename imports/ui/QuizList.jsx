import React, { Component } from 'react';
import moment from 'moment';
import Quiz from './Quiz.jsx';


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
        if (this.isToday()) {
            return [
                {_id: 1, name: "Ett quiz", place: "Din mammas källare", date: "2018-12-31 13:30", groupCount: 3, quizMaster: "Din mamma"}
            ]
        }
        return [];
    }

    renderQuizes(quizes) {
        if (quizes.length === 0) {
            return (<p>Tyvärr ingen quiz idag</p>);
        }
        return quizes.map((quiz) => (
                    <Quiz key={quiz._id} quiz={quiz} />
                    ));
    }

    renderPrevious() {
        return this.isToday() || (<button onClick={this.previousDay}>&lt;-</button>)
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

    render() {
        let tmp = Geolocation.currentLocation();
        let quizes = this.getQuizesByDate(this.state.currentDate);
//        console.log(tmp);

        return (
                <div className="container">
                    <header>
                        {this.renderPrevious()}
                        {moment(this.state.currentDate).format('YYYY-MM-DD')}
                        <button onClick={this.nextDay}>-&gt;</button>
                    </header>
                    <ul>
                        {this.renderQuizes(quizes)}
                    </ul>
                </div>
                );
    }
}