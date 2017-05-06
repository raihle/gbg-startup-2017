import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';

import QuizList from '../imports/ui/App.jsx';

Meteor.startup(() => {
    render(<QuizList />, document.getElementById('react-placeholder'));
});