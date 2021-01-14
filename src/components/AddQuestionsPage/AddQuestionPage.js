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
    // this.props.dispatch({type: 'GET_QUESTIONS_AND_ANSWERS', payload: this.props.lesson.id})            
  } 
  // GET_QUESTIONS_AND_ANSWERS
  state = {
    }


  handleChangeFor = (event, inputType) => { 
    this.setState({ 
      newLesson: {
        ...this.state.newLesson, 
        [inputType]: event.target.value
      }
    })
  }

  submit = () => { 
    this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson}); 
  }

  render() {
    const { classes } = this.props; 
    return (
      <Grid> 
        <Typography variant="h4">Hello from add question page</Typography> 
        {JSON.stringify(this.props.lesson)}
        {JSON.stringify(this.props.reduxState.lesson.currentLesson)}
        {/* {
          this.props.lesson.map(
            <p>test</p>
          )
        } */}
          <Button variant="contained">Add question</Button>
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

