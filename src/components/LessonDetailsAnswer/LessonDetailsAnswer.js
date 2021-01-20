import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsCheck } from "react-icons/bs";
import {
  Grid,
  withStyles,
  Typography, 
 } from '@material-ui/core';

const styles = { 

}

class LessonDetailsAnswer extends Component {
  render() {
    const { classes } = this.props; 
    let statusCheck; 
    if (this.props.answer.correct) { 
      statusCheck = <BsCheck/>
    }
    return (
      <li>
        <Typography variant="body1">{this.props.answer.answer} {statusCheck}</Typography> 
      </li>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(LessonDetailsAnswer))