import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import QuizList from './QuizList.jsx';
import GroupEdit from './GroupEdit';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <div className="container">
                    <AccountsUIWrapper />
                    <Router history={history}>
                        <div>
                            <Route exact path='/' component={QuizList} />
                            <Route exact path='/createGroup' component={GroupEdit} />
                        </div>
                    </Router>
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