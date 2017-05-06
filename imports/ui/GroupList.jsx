import React, { Component } from 'react';
import moment from 'moment';
import Group from './Group.jsx';
import { QuizGroups } from '../api/quizgroups.js';


export default class GroupList extends Component {

    constructor(props) {
        super(props);
    }

    getQuizgroupsById(id) {
        return QuizGroups.find({quizId: id});
        ;
    }

    renderGroupList() {
        console.log(this.props);
        let groups = this.getQuizgroupsById(this.props.match.params.id);

        return groups.map((group) => (
                    <Group key={group._id} group={group} />
                    ));
    }

    render() {
        return (
                <div className="container">
                    {this.renderGroupList()}
                </div>
                );
    }
}