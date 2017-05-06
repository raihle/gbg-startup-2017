import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import QuizList from './QuizList.jsx';
import GroupEdit from './GroupEdit';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <AccountsUIWrapper />

                <QuizList />

                <GroupEdit />
            </div>
        );
    }
}

App.propTypes = {
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, App);