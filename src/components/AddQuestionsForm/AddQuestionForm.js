import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnswerForm from '../AddAnswerForm/AddAnswerForm'; 
import {
  Grid,
  withStyles,
  TextField, 
  Typography,
  Button, 
  Box, 
  Checkbox
 } from '@material-ui/core';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

const styles = { 
  submitButton: { 
    textAlign: "right"
  },
  grow: {
    flexGrow: 1
  }
}

class CreateLesson extends Component {

  state = {  
    mode: 'display', 
    newAnswer: { 
      answer: '', 
      correct: false
    },
      questionEdit: { 
        question: '', 
        lessonId: this.props.question.lesson_id, 
        questionId: this.props.question.id, 
      }
  }

  deleteQuestion = () => { 
    console.log('DELETING question', this.props.question.id); 
    this.props.dispatch({
      type: 'DELETE_QUESTION', payload: {
        questionId: this.props.question.id, lessonId: this.props.question.lesson_id 
      }}); 
  }
  handleChangeForAnswer = (event, inputType) => { 
    if (inputType === "answer") { 
      this.setState({ 
        newAnswer: { 
          ...this.state.newAnswer,
          [inputType]: event.target.value
        }
      })
    } else if (inputType === "correct") { 
      console.log('change is happeinging dasfasdfasf')
      this.setState({ 
        newAnswer: { 
          ...this.state.newAnswer,
          [inputType]: !this.state.newAnswer.correct
        }
      })
    }
  } 
  handleChangeForQuestion = (event) => { 
    this.setState({ 
      questionEdit: {
        ...this.state.questionEdit, 
        question: event.target.value
      }
    })
  }  
  toggleEditMode = () => { 
    if (this.state.mode === 'display') { 
      this.setState({ 
        mode: 'edit', 
        questionEdit: { 
          ...this.state.questionEdit,
          question: this.props.question.question, 
        }
      })
    } else { 
      this.setState({ 
        mode: 'display'
      })
    }
  } 
  save = () => { 
    this.props.dispatch({type: 'EDIT_QUESTION', payload: this.state.questionEdit}); 
  }
  addAnswer = () => { 
    this.props.dispatch({type: 'ADD_ANSWER', payload:{ 
      questionId: this.props.question.id, 
      lessonId: this.props.question.lesson_id,
      answer: this.state.newAnswer.answer, 
      correct: this.state.newAnswer.correct 
    }});
    this.setState({ 
      newAnswer: { 
        answer: '', 
        correct: false
      }
    })
  } 

  render() {
    const { classes } = this.props; 
    let question; 
    let questionSaveOrDeleteButton; 
    if (this.state.mode === 'display') { 
      questionSaveOrDeleteButton = <Button variant="contained" style={{marginLeft:'10px'}} onClick={this.toggleEditMode}>Edit</Button> 
    } else if (this.state.mode === 'edit') { 
      questionSaveOrDeleteButton = <Button variant="contained" style={{marginLeft:'10px'}} onClick={() => {this.toggleEditMode(); this.save()}}>Save</Button> 
    }
    if (this.state.mode === 'display') { 
      question = <Typography className={classes.grow} label="Question" variant="body1" style={{display: "block"}} > 
                    {`${this.props.number}) ${this.props.question.question}`}
                </Typography>
    } else if (this.state.mode === 'edit') { 
      question = <TextField className={classes.grow} onChange={this.handleChangeForQuestion} value={this.state.questionEdit.question}/>
    }

    return (
      <Box boxShadow={2} style={{margin: "3%", padding: "5%", display: "block", backgroundColor: 'white'}}> 
        <Grid  
          container
          direction="row"
          justify="flex-start"
          style={{marginRight: 200}}
        > 
            {question}
          <Grid style={{textAlign: 'left', display: 'inline-block', marginLeft: '10px'}}>
            {/* ------------------------------- Gid containing delete, and edit or delete buttons----------------- */}
              <Button variant="contained" onClick={this.deleteQuestion}>Delete</Button>
              {questionSaveOrDeleteButton}
            </Grid> 
          </Grid>
          <Grid style={{textAlign: 'center', margin: '2%'}} >
          <Box component="span">
            <TextField
              style={{width: '45%', marginBottom: '5%'}}
              onChange={(event)=>this.handleChangeForAnswer(event, "answer")}
              value={this.state.newAnswer.answer}
            />
          </Box>
          <Box component="span" style={{marginLeft: '2%'}}>
            <Checkbox color="secondary" checked={this.state.newAnswer.correct} onChange={(event)=>this.handleChangeForAnswer(event, "correct")}/>
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
              <AddAnswerForm key={i} order={i} answer={answer}/> 
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
