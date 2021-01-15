import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddQuestionForm from '../AddQuestionsForm/AddQuestionForm';
import {
  Grid,
  withStyles,
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
  componentDidMount() { 
    // this.props.dispatch({type: "GET_ALL_LESSONS"}); 
    console.log('----------------------------------------------COMPONENT MOUNTED ------------------------------------------------------')
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.id})            
  } 
  // GET_QUESTIONS_AND_ANSWERS
  state = {
    }


    addQuestion = () => { 
    console.log('adding new question'); 
  }

  submit = () => { 
    this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson}); 
  }

  render() {
    const { classes } = this.props; 
    return (
      <Grid> 
        <Typography variant="h4">Hello from add question page</Typography> 
        {/* {JSON.stringify(this.props)} */}
        {/* {JSON.stringify(this.props.params)} */}
        {JSON.stringify(this.props.reduxState.question.currentLessonAnswers)}
        {/* {JSON.stringify(this.props.reduxState.question.currentLessonQuestions)} */}
        {
          this.props.reduxState.question.currentLessonQuestions.map((question, i) =>  
            <AddQuestionForm key={i} question={question}/>
          )
        }
          <Button variant="contained" onClick={this.addQuestion}>Add question</Button>
          <Grid className={classes.submitButton}>
            <Button style={{marginRight: "1000"}} variant="contained" onClick={() => this.submit()}>Submit</Button>
          </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

