import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import QuizList from '../imports/ui/QuizList.jsx';

Meteor.startup(() => {
    render(<QuizList />, document.getElementById('react-placeholder'));
});