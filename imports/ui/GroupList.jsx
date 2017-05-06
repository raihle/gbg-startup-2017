import React, { Component } from 'react';
import Group from './Group.jsx';
import { QuizGroups } from '../api/quizgroups.js';
import {AppBar, IconButton} from "material-ui";
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


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
                <div>
                    <AppBar
                        title="Quizy"
                        titleStyle={{fontStyle: "italic"}}
                        iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
                        onLeftIconButtonTouchTap={()=>window.location="/"}
                    />
                    {this.renderGroupList()}
                </div>
                );
    }
}