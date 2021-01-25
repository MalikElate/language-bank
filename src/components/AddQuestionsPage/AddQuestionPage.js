import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddQuestionForm from '../AddQuestionsForm/AddQuestionForm';
import {
  Grid,
  withStyles,
  Typography, 
  Button, 
  TextField, 
  Box
 } from '@material-ui/core';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = { 
  submitButton: { 
    textAlign: "right", 
    marginRight: "5%"
  }, 
  addButton: { 
    marginRight: "5%"
  }, 
  grow: { 
    flexGrow: 1
  }
}

class CreateLesson extends Component {
  componentDidMount() { 
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.id});
    this.props.dispatch({type: 'GET_ANSWER', payload: this.props.match.params.id});
    if (this.props.reduxState.question.currentLessonQuestions.length > 0) { 
      this.setState({ 
        backgroundColor: "white", 
        boxShadow: "2"
      })
    }
  } 
    
  // GET_QUESTIONS_AND_ANSWERS
  state = {
      newQuestion: { 
        question: '', 
        lessonId: this.props.match.params.id
      }, 
      boxShadow: "0", 
      backgroundColor: "#f9f9f9"
    }

  addQuestion = () => { 
    this.props.dispatch({type: 'ADD_QUESTION', payload: this.state.newQuestion}); 
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.id}); 
    this.setState({ 
      newQuestion: { 
        ...this.state.newQuestion,
        question: '', 
      }
    })
  }

  // Submit only sends the user to the next page, all of the data is actually already in the db (assuming all edits are done)
  submit = () => { 
    // this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson}); 
    this.props.history.push(`/lesson/details/${this.props.match.params.id}`);   
  } 

  handleChangeQuestion = (event) => { 
    this.setState({ 
      newQuestion: { 
        ...this.state.newQuestion, 
        question: event.target.value
      }
    })
  }

  render() {
    const { classes } = this.props; 
    let topSubmitButton; 
    if (this.props.reduxState.question.currentLessonQuestions.length >= 3) { 
      topSubmitButton = 
      <Grid style={{textAlign: 'right', marginRight: '5%'}}>
        <Button style={{marginRight: "1000"}} variant="contained" onClick={() => this.submit()}>Submit</Button>
      </Grid>
    }

    return (
      // <Grid style={{textAlign: 'center', padding:'0%', margin: '0%'}} spacing={0} >
      <>
        <Box component="div" style={{marginLeft: '5%', marginTop: "20px"}}>
          <Typography variant="h4">Add Questions</Typography> 
        </Box>
        <Grid style={{textAlign: 'center', marginTop: '6%'}} >
          <Box boxShadow={2} style={{backgroundColor: "white", marginLeft: "3%", marginBottom: "3%", marginRight: "3%", padding: "20px" }}>
            <Box component="span">
              <TextField
                style={{width: '72%', marginBottom: '5%'}}
                onChange={this.handleChangeQuestion}
                value={this.state.newQuestion.question}
                />
            </Box>
            <Box component="span" style={{marginLeft: '5%'}}>
              <Button variant="contained" className="add-btn" onClick={this.addQuestion}>Add question</Button>
              {topSubmitButton}
            </Box>
          </Box>
        </Grid>
          {
            this.props.reduxState.question.currentLessonQuestions.map((question, i) =>  
              <AddQuestionForm key={i} number={i + 1} question={question}/>
            )
          }
      <Grid className={classes.submitButton}>
        <Button style={{marginRight: "1000"}} variant="contained" onClick={() => this.submit()}>Submit</Button>
      </Grid>
      </>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

