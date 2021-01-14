import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Typography, 
  TextField, 
  Button
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
  state = {
    newLesson: { 
      lesson_owner_id: this.props.reduxState.user.id,
      lessonName: '', 
      language: '', 
      description: '', 
      notes: ''
    }, 
    lessonCreated: false
  };

  handleChangeFor = (event, inputType) => { 
    this.setState({ 
      newLesson: {
        ...this.state.newLesson, 
        [inputType]: event.target.value
      }
    })
  }

  submit = () => { 
    this.props.history.push(
      `/addquestions/${this.props.reduxState.lesson.allUserLessons[this.props.reduxState.lesson.allUserLessons.length - 1 ]?.id}`
      )
  }
  create = () => { 
    if (this.state.newLesson.description === '') { 
      alert('please add a lesson name or language')
    } else { 
      this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson});
      this.setState({
        lessonCreated: true
      })
    }
  }

  render() {
    const { classes } = this.props; 
    let submitButton = <Button style={{marginRight: "1000"}} variant="contained" onClick={this.submit}>Next</Button>
    let createButton = <Button style={{marginRight: "1000"}} variant="contained" onClick={this.create}>Create</Button>
    if (this.state.lessonCreated === false) { 
      submitButton = <div></div>
    } 
    if (this.state.lessonCreated === true) { 
      createButton = <div></div>
    } 
    return (
      <Grid> 
        <Typography variant="h4">Create a lesson </Typography> 
        {JSON.stringify((this.props.reduxState.lesson.allUserLessons[this.props.reduxState.lesson.allUserLessons.length - 1]?.id))}
        <Grid  
          container
          direction="column"
          justify="center"
          alignItems="center" 
          > 
          <TextField label="Lesson Name" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'lessonName')} value={this.state.newLesson.lessonName}/>
          <TextField label="Language" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'language')} value={this.state.newLesson.language}/>
          <TextField label="Description" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'description')} value={this.state.newLesson.description}/>
          <TextField label="Notes Link" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'notes')} value={this.state.newLesson.notes}/>
          {createButton}
        </Grid> 
        <Grid className={classes.submitButton}>
          {submitButton}
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

