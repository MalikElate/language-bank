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
  }, 
}

class CreateLesson extends Component {
  state = { 
    mode: 'display', 
    answerEdit: { 
      answer: this.props.answer.answer, 
      answerId: this.props.answer.id, 
      lessonId: this.props.reduxState.question.currentLessonQuestions[0].lesson_id
    }
  }
  deleteAnswer = () => {  
    this.props.dispatch({type: 'DELETE_ANSWER', payload:{ 
      answerId: this.props.answer.id, lessonId: this.props.reduxState.question.currentLessonQuestions[0].lesson_id
    }})
  }
  toggleEditMode = () => { 
    if (this.state.mode === 'display') { 
      this.setState({ 
        mode: 'edit', 
        // questionEdit: { 
        //   ...this.state.questionEdit,
        //   question: this.props.question.question, 
        // }
      })
    } else { 
      this.setState({ 
        mode: 'display'
      })
    }
  } 
  handleChangeForQuestion = (event) => { 
    this.setState({ 
      answerEdit: {
        ...this.state.answerEdit, 
        answer: event.target.value
      }
    })
  }  
  save = () => { 
    this.props.dispatch({type: 'EDIT_ANSWER', payload: this.state.answerEdit}); 
    console.log("saving question")
  }

  render() {
    const { classes } = this.props; 
    let answer; 
    let answerSaveOrDeleteButton; 
    if (this.state.mode === 'display') { 
      answerSaveOrDeleteButton = <Button variant="contained" onClick={this.toggleEditMode} style={{marginLeft: '10px'}}>edit</Button>
    } else if (this.state.mode === 'edit') { 
      answerSaveOrDeleteButton = <Button variant="contained" style={{marginLeft:'10px'}} onClick={() => {this.toggleEditMode(); this.save()}}>Save</Button> 
    }
    if (this.state.mode === 'display') { 
      answer = <Typography variant="body1">{this.props.answer.answer}</Typography>
    } else if (this.state.mode === 'edit') { 
      answer = <TextField style={{width: '40%'}} onChange={this.handleChangeForQuestion} value={this.state.answerEdit.answer}/>
    }
    return (
    
        <Grid  
          container
          direction="row"
          justify="center"
          style={{margin: '5px'}}
        > 
          {answer}
          <Checkbox/>
          <Button variant="contained" onClick={this.deleteAnswer}>delete</Button>
          {answerSaveOrDeleteButton}
        </Grid>  
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

