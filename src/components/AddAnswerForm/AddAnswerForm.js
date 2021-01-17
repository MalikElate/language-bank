import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  TextField, 
  Typography,
  Button, 
  Checkbox
 } from '@material-ui/core';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = { 
  submitButton: { 
    textAlign: "right"
  }
}

class CreateLesson extends Component {
  deleteAnswer = () => {  
    this.props.dispatch({type: 'DELETE_ANSWER', payload:{ 
      answerId: this.props.answer.id, lessonId: this.props.reduxState.question.currentLessonQuestions[0].lesson_id
    }})
  }

  render() {
    const { classes } = this.props; 
    return (
    
        <Grid  
          container
          direction="row"
          justify="center"
          style={{margin: '5px'}}
        >
          <Typography variant="body1">{this.props.answer.answer}</Typography>
          <Checkbox/>
          <Button variant="contained" onClick={this.deleteAnswer}>delete</Button>
          <Button variant="contained" style={{marginLeft: '10px'}}>edit</Button>
        </Grid>  
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

