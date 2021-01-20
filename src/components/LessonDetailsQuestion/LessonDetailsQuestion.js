import React, { Component } from 'react';
import { connect } from 'react-redux';
import LessonDetailsAnswer from '../LessonDetailsAnswer/LessonDetailsAnswer'; 
import {
  Grid,
  withStyles,
  Typography, 
  Button
 } from '@material-ui/core';

const styles = { 

}

class LessonDetailsQuestion extends Component {
  componentDidMount() { 
    // this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.lessonId});
  }
  render() {
    const { classes } = this.props; 
    return (
      <Grid>
        <li>
          <Typography variant="body1"> {this.props.question.question}</Typography> 
          <ol>
          {
            this.props.reduxState.answer.currentLessonAnswers.filter((answer) => {  
              return this.props.question.id === answer.question_id 
            }).map((answer, i) => 
            <LessonDetailsAnswer  key={i} answer={answer}/> 
            )
          }
          </ol>
        </li>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(LessonDetailsQuestion))