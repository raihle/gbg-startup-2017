import React, { Component } from 'react';

import Quiz from './Quiz.jsx';

export default class QuizList extends Component {
    getQuizes() {
        return [
            { _id: 1, name: "Ett quiz", place: "Din mammas källare", date: "2018-12-31 13:30", groupCount: 3, quizMaster: "Din mamma"}
        ]
    }

    renderQuizes() {
        let quizes = this.getQuizes();

        return quizes.map((quiz) => (
            <Quiz key={quiz._id} quiz={quiz} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    Quizes!
                </header>
                <ul>
                    {this.renderQuizes()}
                </ul>
            </div>
        );
    }
}