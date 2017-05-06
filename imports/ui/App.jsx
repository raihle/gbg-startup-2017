import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import 'moment/locale/sv';

import QuizList from './QuizList.jsx';
import GroupList from './GroupList.jsx';
import GroupEdit from './GroupEdit';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {AppBar} from "material-ui";

// Needed for onTouchTap in Material UI
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const history = createBrowserHistory();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(moment.locale('sv'));
        console.log(moment());
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <AppBar
                        title="Quizy"
                        titleStyle={{fontStyle: "italic"}}
                        showMenuIconButton={false}
                    />
                    <div className="login-button-test">
                        <AccountsUIWrapper />
                    </div>
                    <Router history={history}>
                        <div>
                            <Route exact path='/' component={QuizList} />
                            <Route exact path='/quiz/:id' component={GroupList} />
                            <Route exact path='/createGroup' component={GroupEdit} />
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
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