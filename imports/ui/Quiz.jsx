import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this);
    }

    goTo() {
        console.log(this.props.quiz._id);
    }

    render() {
        return (
                <li className="quiz">
                    <a href="#" onClick={this.goTo}>{this.props.quiz.name} - {this.props.quiz.place}</a>
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