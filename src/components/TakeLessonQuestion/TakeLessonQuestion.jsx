import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Button, 
  Box, 
  Typography
 } from '@material-ui/core';

const styles = { 
  buttonGrid: { 
    textAlign: "left", 
    marginLeft: '5%',
    display: 'block'
  }, 
  root: { 
    marginRight: '80%',
  }, 
}

class TakeLessonQuestion extends Component {

  state = { 
    
  }

  componentDidMount() { 
    this.props.dispatch({type: 'GET_ANSWER', payload: this.props.match.params.questionId});
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.lessonId});
  }

  handleChangeFor = (event, inputType) => { 
    this.setState({ 
      newStudent: { 
        ...this.state.newStudent,
        [inputType]: event.target.value
      }
    })
  }

  render() {
    const { classes } = this.props; 
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block"}}>
            <Grid  
              container
              direction="column"
              justify="center"
              alignItems="center" 
            > 
            {
              this.props.reduxState.question.currentLessonQuestions.filter((question) => {  
                return question.id === Number(this.props.match.params.questionId ) 
            }).map((question, i) =>  
              <Typography key={i}>
                {question.question}
              </Typography>
            )
            }
            {/* {
          this.props.reduxState.answer.currentLessonAnswers.filter((answer) => {  
              return this.props.question.id === answer.question_id 
            }).map((answer, i) => 
              <AddAnswerForm key={i} order={i} answer={answer}/> 
            )
          } */}
            </Grid>
          </Box>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(TakeLessonQuestion))