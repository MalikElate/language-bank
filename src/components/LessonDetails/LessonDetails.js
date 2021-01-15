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
    heading: 'Lesson Details page for lesson id:',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading} {this.props.lesson.id}</h2> 
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LessonDetails);
