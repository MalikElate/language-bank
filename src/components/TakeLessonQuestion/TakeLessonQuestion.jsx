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
    mode: "question",
    correct: false, 
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
        // console.log("---------MATCH---------------", question.lesson_id); 
        // console.log("---------Next index---------------", this.props.reduxState.question.currentLessonQuestions?.indexOf(question) + 1); 
        // console.log("------------Next ID _________", this.props.reduxState.question.currentLessonQuestions[this.props.reduxState.question.currentLessonQuestions?.indexOf(question) + 1]?.id)
        // console.log("---------current index-------------", this.props.reduxState.question.currentLessonQuestions?.indexOf(question)); 
        // console.log("---------final index---------------", this.props.reduxState.question.currentLessonQuestions.length - 1);
        this.setState({ 
          nextQuestionId: this.props.reduxState.question.currentLessonQuestions[this.props.reduxState.question.currentLessonQuestions?.indexOf(question) + 1]?.id,
          currentQuestionIndex: this.props.reduxState.question.currentLessonQuestions?.indexOf(question), 
          finalQuestionIndex: this.props.reduxState.question.currentLessonQuestions.length - 1
        })
      }
    }
  }
  // path="/take-lesson/question/:lessonId/:questionId"
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

  render() {
    const { classes } = this.props; 
    let boxContents; 
    if(this.state.mode === "question") { 
      boxContents = <>
      {
        this.props.reduxState.question.currentLessonQuestions.filter((question) => {  
          return question.id === Number(this.props.match.params.questionId ); 
      }).map((question, i) =>  
        <Typography variant="body1" key={i}>
          {question.question}
        </Typography>
      )
      }
      {
      this.props.reduxState.answer.currentLessonAnswers.filter((answer) => {  
        return answer.question_id === Number(this.props.match.params.questionId)
      }).map((answer, i) => 
      <Typography variant="body1" key={i}>
            {answer.answer}</Typography> 
        )
      } 
      <Button variant="contained" onClick={this.submitAnswer}>Submit</Button>
      </>
    } else if (this.state.mode === "confirmation") { 
        boxContents = <>
        <Button variant="contained" onClick={this.nextQuestion}>Next</Button>

        </>
      }
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        {/* {JSON.stringify(this.props.reduxState.answer.currentLessonAnswers)} */}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block"}}>
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