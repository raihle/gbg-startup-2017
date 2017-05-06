import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export default class Group extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <li className="quiz">
                    <a href={"/quiz/" + this.props.group._id}>{this.props.group.name}</a>
                    <h3>{this.props.group.missingMemberCount}</h3>
                </li>
                );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired,
};

/*
 name: PropTypes.string.isRequired,
 place: PropTypes.string.isRequired,
 date: PropTypes.string.isRequired,
 quizMaster: PropTypes.string.isRequired,
 groupCount: PropTypes.number.isRequired,
 */