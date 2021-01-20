import React, { Component } from 'react';
import { connect } from 'react-redux';
import LessonDetailsQuestion from '../LessonDetailsQuestion/LessonDetailsQuestion'; 
import {
  Grid,
  withStyles,
  Button, 
  Box
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
        <Grid  direction="row" className={classes.root} container> 
          <Grid item xs={5} style={{marginLeft: '4%'}} > 
            <Box boxShadow={2} style={{margin: "3%", padding: "5%", display: "block"}} className={classes.itemGrid}>
              <Button variant="contained" style={{marginRight: '10px'}} onClick={this.editLesson}>Edit</Button>
              <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete</Button>
              <ol>
              {
                this.props.reduxState.question.currentLessonQuestions.map((question, i) =>  
                  <LessonDetailsQuestion key={i} question={question}/>
                )
              }
              </ol>
              {bottomButtons}
            </Box>
          </Grid>
          <Grid item xs={5} > 
          <Box boxShadow={2} style={{margin: "3%", padding: "5%", display: "block"}} className={classes.itemGrid}>


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