import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import QuizList from './QuizList.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newTaskName: '',
            hideCompleted: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewTaskNameChange = this.handleNewTaskNameChange.bind(this);
        this.toggleHideCompleted = this.toggleHideCompleted.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = this.state.newTaskName.trim();

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        this.setState({ newTaskName: '' });
    }

    handleNewTaskNameChange(event) {
        this.setState({ newTaskName: event.currentTarget.value });
    }

    toggleHideCompleted() {
        this.setState({ hideCompleted: !this.state.hideCompleted });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter((task) => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div className="container">
                <AccountsUIWrapper />

                { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textmeteor
                            Input"
                            placeholder="Type to add new tasks"
                        />
                    </form> : ''
                }
                <QuizList />
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteTasksCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteTasksCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);