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
  Box
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

  state = {  
      answer: ''
  }

  deleteQuestion = () => { 
    console.log('DELETING question', this.props.question.id); 
    this.props.dispatch({
      type: 'DELETE_QUESTION', payload: {
        questionId: this.props.question.id, lessonId: this.props.question.lesson_id 
      }}); 
  }

  handleChangeForAnswer = (event) => { 
    this.setState({ 
        answer: event.target.value
    })
  }

  addAnswer = () => { 
    this.props.dispatch({type: 'ADD_ANSWER', payload:{ 
      questionId: this.props.question.id, lessonId: this.props.question.lesson_id, answer: this.state.answer 
    }});
    this.setState({ 
        answer: ''
    })
  }

    render() {
    const { classes } = this.props; 
    return (
      <Box boxShadow={2} style={{margin: "3%", padding: "5%", display: "block", backgroundColor: 'white'}}> 
          <Grid  
            container
            direction="row"
            justify="flex-end"
            style={{marginRight: 200}}
          > 
            <Grid style={{textAlign: 'left', display: 'inline'}}>
              <Typography label="Question" variant="body1" style={{display: "block"}} > 
                {`${this.props.number}) ${this.props.question.question}`}
              </Typography>
              {/* ------------------------------- Gid containing delete and edit buttons ----------------------------- */}
              </Grid>
                <Button variant="contained" onClick={this.deleteQuestion}>Delete</Button>
                <Button variant="contained" style={{marginLeft:'10px'}} onClick={this.deleteQuestion}>Edit</Button>
              </Grid> 
              {/* ------------------------------- Gid containing the edit input and button ----------------------------- */}
            <Grid style={{textAlign: 'center', margin: '2%'}} >
            <Box component="span">
              <TextField
                style={{width: '45%', marginBottom: '5%'}}
                onChange={this.handleChangeForAnswer}
                value={this.state.answer}
              />
            </Box>
            <Box component="span" style={{marginLeft: '5%'}}>
              <Button variant="contained" style={{margin:'10px'}} onClick={this.addAnswer}>Add answer</Button> 
            </Box>
          </Grid> 
            {/* ------------------------------- Gid containing the answers ----------------------------- */}
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
      </Box>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))
