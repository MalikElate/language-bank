import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Button, 
  Box, 
  Typography, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio
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
  correct: false
}

class TakeLessonQuestion extends Component {

  state = { 
    mode: "question",
    correct: "false", 
    nextQuestionId: "something went wrong", 
    currentQuestionIndex: "something went wrong", 
    finalQuestionIndex:"something went wrong"
  }

  componentDidMount() { 
    this.props.dispatch({type: 'GET_ANSWER', payload: Number(this.props.match.params.lessonId)});
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.lessonId});

  }
  submitAnswer = () => { 
    this.setState({ 
      mode: "confirmation"
    })
    for (let question of this.props.reduxState.question.currentLessonQuestions) { 
      if (question.id == this.props.match.params.questionId) { 
        this.setState({ 
          nextQuestionId: this.props.reduxState.question.currentLessonQuestions[this.props.reduxState.question.currentLessonQuestions?.indexOf(question) + 1]?.id,
          currentQuestionIndex: this.props.reduxState.question.currentLessonQuestions?.indexOf(question), 
          finalQuestionIndex: this.props.reduxState.question.currentLessonQuestions.length - 1
        })
      }
    }
  }
  nextQuestion = () => { 
    this.setState({ 
      mode: "question"
    }) 
    if (this.state.finalQuestionIndex == this.state.currentQuestionIndex) { 
      this.props.history.push(
        `/take-lesson/confirmation/${this.props.match.params.lessonId}`
      );
    } else { 
      this.props.history.push(
        `/take-lesson/question/${this.props.match.params.lessonId}/${this.state.nextQuestionId}`
      );
    }
  }
  handleChangeForAnswer = (event) => { 
    this.setState({ 
      "correct": event.target.value
    })
  } 

  render() {
    const { classes } = this.props; 
    const mode = this.state.correct[0] === 'f'; 
    console.log(mode)
    let boxContents; 
    if(this.state.mode === "question") { 
      boxContents = <><Grid>
      {
        this.props.reduxState.question.currentLessonQuestions.filter((question) => {  
          return question.id === Number(this.props.match.params.questionId ); 
      }).map((question, i) =>  
        <Typography style={{padding: "15px"}}variant="body1" key={i}>
          {question.question}
        </Typography>
      )
      }
      <FormControl>
          <RadioGroup column>
            {
            this.props.reduxState.answer.currentLessonAnswers.filter((answer) => {  
              return answer.question_id === Number(this.props.match.params.questionId)
            }).map((answer, i) => 
            <>
              <FormControlLabel 
              key={i}
              value={answer.correct.toString() + i}  
              onChange={(event)=>this.handleChangeForAnswer(event)} 
              control={<Radio key={i}/>} label={answer.answer} 
              />   
            </>
              )
            }
        </RadioGroup>
      </FormControl>
      </Grid>
      <Button variant="contained" onClick={this.submitAnswer}>Submit</Button>
      </>
    } else if (this.state.mode === "confirmation") { 
        boxContents = <> 

        {
          mode ? 
          <Typography variant="h6">That is incorrect, check the notes for more info</Typography>
          : 
          // correct answer
          <Typography variant="h6">That is correct! </Typography>

        }
        <Button variant="contained" onClick={this.nextQuestion}>Next</Button>

        </>
      }
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        {/* {JSON.stringify(this.props.reduxState.answer.currentLessonAnswers)} */}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block", backgroundColor: "white"}}>
            <Grid  
              container
              direction="column"
              justify="center"
              alignItems="center" 
            > 
            {boxContents}
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