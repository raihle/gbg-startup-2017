import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

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
                <header>
                    <h1>Todo List ({this.props.incompleteTasksCount} left)</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            checked={this.state.hideCompleted}
                            onChange={this.toggleHideCompleted}
                        />
                        Hide completed tasks
                    </label>

                    <form className="new-task" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type to add a new task"
                            value={this.state.newTaskName}
                            onChange={this.handleNewTaskNameChange}
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteTasksCount: PropTypes.number.isRequired,
}

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteTasksCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
}, App);