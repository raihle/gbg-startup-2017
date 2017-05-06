import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tasks } from '../api/tasks.js';

export default class Task extends Component {

    constructor(props) {
        super(props);

        this.toggleChecked = this.toggleChecked.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    };

    handleDelete() {
        Tasks.remove(this.props.task._id);
    };

    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.handleDelete}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    checked={this.props.task.checked}
                    onChange={this.toggleChecked}
                />
                {this.props.task.text}
                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};