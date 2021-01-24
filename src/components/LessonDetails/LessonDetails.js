import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai";
import LessonDetailsQuestion from '../LessonDetailsQuestion/LessonDetailsQuestion'; 
import {
  Grid,
  withStyles,
  Button, 
  Box, 
  Typography
 } from '@material-ui/core';

const styles = { 
  root: { 
    flexGrow: 1
  }, 
  itemGrid: { 
    minHeight: "70vh"
  }
}

class LessonDetails extends Component {

  componentDidMount() { 
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.lessonId});
    this.props.dispatch({type: 'GET_ANSWER', payload: this.props.match.params.lessonId});
    this.props.dispatch({type: 'GET_CURRENT_LESSON', payload: this.props.match.params.lessonId});
  }

  deleteLesson = () => { 
      if (window.confirm('Are you sure you want to delete this lesson?', this.props.match.params.lessonId, this.props.reduxState.user.id)) {
        this.props.dispatch({type: 'DELETE_LESSON', payload: {
          lessonId: this.props.match.params.lessonId, userId: this.props.reduxState.user.id} 
        }); 
        this.props.history.push('/dashboard'); 
    }
  }
  editLesson = () => { 
    this.props.history.push(`/add-questions/${this.props.match.params.lessonId}`); 
  }
  render() {
    const { classes } = this.props; 
    let bottomButtons; 
    if (this.props.reduxState.question.currentLessonQuestions > 7) { 
      bottomButtons = <><Button variant="contained" onClick={this.editLesson}>Edit</Button>
      <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete</Button></>
    }
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        <Grid style={{textAlign: "left", marginLeft: '6%'}}> 
              <Typography color="primary" variant="h5">Lesson Details: {this.props.reduxState.lesson.currentLesson[0]?.name}</Typography>
        </Grid> 
        <Grid  direction="row" className={classes.root} container> 
          <Grid item xs={5} style={{marginLeft: '4%'}} > 
            <Box boxShadow={2} style={{backgroundColor: 'white', margin: "3%", padding: "5%", display: "block"}} className={classes.itemGrid}>
            <Grid style={{marginBottom: "10"}}>
              <Button variant="contained" style={{marginRight: '10px'}} onClick={this.editLesson}>Edit lesson</Button>
              <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete lesson</Button>
            </Grid>
              <ol>
              {
                this.props.reduxState.question.currentLessonQuestions.map((question, i) =>  
                <Grid key={i} style={{margin: '3%'}}> 
                  <LessonDetailsQuestion key={i} question={question}/>
                </Grid>
                )
              }
              </ol>
              {bottomButtons}
            </Box>
          </Grid>
          <Grid item xs={5} > 
          <Box boxShadow={2} style={{backgroundColor: 'white', margin: "3%", padding: "5%", display: "block"}} className={classes.itemGrid}>
            <Grid style={{textAlign: "center", padding: '10px'}}> 
              <Typography variant="h6">{this.props.reduxState.lesson.currentLesson[0]?.name}</Typography>
            </Grid> 
            <ul>
              <li>
                <Typography style={{margin: "3%"}}>language: {this.props.reduxState.lesson.currentLesson[0]?.language}</Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>description: {this.props.reduxState.lesson.currentLesson[0]?.description}</Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>notes: <a target="_blank" href={this.props.reduxState.lesson.currentLesson[0]?.notes}>{this.props.reduxState.lesson.currentLesson[0]?.notes}</a></Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>country: {this.props.reduxState.lesson.currentLesson[0]?.country}</Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>public: {this.props.reduxState.lesson.currentLesson[0]?.public.toString()}</Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>difficulty: {this.props.reduxState.lesson.currentLesson[0]?.difficulty}</Typography>
              </li>
              <li>
                <Typography style={{margin: "3%"}}>lesson code: {this.props.reduxState.lesson.currentLesson[0]?.code}
                <Button style={{marginLeft: "3%"}} value={this.props.reduxState.lesson.currentLesson[0]?.code} onClick={(event) => { 
                  copy(this.props.reduxState.lesson.currentLesson[0]?.code) 
                }}><AiOutlineCopy/></Button>
                </Typography>
              </li>
            </ul>
            {/* {JSON.stringify(this.props.reduxState.lesson.currentLesson[0])} */}
          </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(LessonDetails))