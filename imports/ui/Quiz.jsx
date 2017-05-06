import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export default class Quiz extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="quiz">
                <h1>{this.props.quiz.name} - {this.props.quiz.place}</h1>
                <h2>{moment(this.props.quiz.date).format('YYYY-MM-DD hh:mm')}</h2>
                <h3>{this.props.quiz.quizMaster}</h3>
                <p>{this.props.quiz.groupCount} grupper</p>
            </li>
        );
    }
}

Quiz.propTypes = {
    quiz: PropTypes.object.isRequired,
};

/*
 name: PropTypes.string.isRequired,
 place: PropTypes.string.isRequired,
 date: PropTypes.string.isRequired,
 quizMaster: PropTypes.string.isRequired,
 groupCount: PropTypes.number.isRequired,
 */