import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import {
//   Grid,
//   withStyles,
//   Typography, 
//   Button
//  } from '@material-ui/core';

class LessonDetails extends Component {
  state = {
    heading: 'Lesson Details page',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2> 
        {this.props.lesson.id}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LessonDetails);
