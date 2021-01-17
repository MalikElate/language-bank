import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnswerForm from '../AddAnswerForm/AddAnswerForm'; 
import axios from 'axios'
import {
  Grid,
  withStyles,
  TextField, 
  Typography,
  Button, 
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

  deleteQuestion = () => { 
    console.log('DELETING question', this.props.question.id); 
    this.props.dispatch({
      type: 'DELETE_QUESTION', payload: {
        questionId: this.props.question.id, lessonId: this.props.question.lesson_id 
      }}); 
  }

  addAnswer = () => { 
    this.props.dispatch({type: 'ADD_ANSWER', payload:{ 
      questionId: this.props.question.id, lessonId: this.props.question.lesson_id 
    }});
  }

    render() {
    const { classes } = this.props; 
    console.log(this.props.key)
    return (
      <Grid> 
        <Grid  
          container
          direction="column"
          justify="center"
          alignItems="center" 
          >
        <Grid  
          container
          direction="row"
          justify="flex-end"
          style={{marginRight: 200}}
        > 
        <Grid xs={10} style={{textAlign: 'left', display: 'inline'}}>
          <Typography label="Question" variant="body1" style={{display: "block"}} > 
            {`${this.props.number}) ${this.props.question.question}`}
          </Typography>
        </Grid>
          <Button variant="contained" onClick={this.deleteQuestion}>Delete</Button>
          <Button variant="contained" style={{marginLeft:'10px'}} onClick={this.deleteQuestion}>Edit</Button>
        </Grid> 
        <Grid  
          container
          direction="row"
          justify="center"
        > 
          {
           this.props.reduxState.answer.currentLessonAnswers.filter((answer) => {  
              return this.props.question.id === answer.question_id 
            }).map((answer, i) => 
              <AddAnswerForm key={i} answer={answer}/> 
            )
          }
        </Grid>
          <Button variant="contained" style={{margin:'10px'}} onClick={this.addAnswer}>Add answer</Button> 
        </Grid>  
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))
