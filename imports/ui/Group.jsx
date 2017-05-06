import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Card, CardHeader, CardText} from "material-ui";


export default class Group extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="quiz">
                <a href={"/quiz/" + this.props.group._id}>
                    <Card>
                        <CardHeader
                            title={this.props.group.name}
                            subtitle={
                                <div>
                                    <p>Söker {this.props.group.missingMemberCount} medlemmar</p>
                                    <p>{this.props.group.description}</p>
                                </div>
                            }
                            titleStyle={{fontSize:"1.5rem"}}
                        />
                        <CardText>
                            {}
                        </CardText>
                    </Card>
                </a>
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