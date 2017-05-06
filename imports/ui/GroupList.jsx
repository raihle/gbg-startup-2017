import React, { Component } from 'react';
import moment from 'moment';
//import Quiz from './Quiz.jsx';
import { QuizGroups } from '../api/quizgroups.js';


export default class GroupList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match);
        return (
                <div className="container">
                group
                </div>
                );
    }
}