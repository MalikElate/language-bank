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
    this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson})
  }

  render() {
    const { classes } = this.props; 
    return (
      <Grid> 
        {JSON.stringify(this.props.reduxState.user.id)}
        <Typography variant="h4">Hello from create lesson page</Typography>
        <Grid  
          container
          direction="column"
          justify="center"
          alignItems="center" 
          > 
          <TextField label="Lesson Name" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'lessonName')}/>
          <TextField label="Language" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'language')}/>
          <TextField label="Description" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'description')}/>
          <TextField label="Notes" variant="outlined" style={{display: "block"}} 
          onChange={(event)=> this.handleChangeFor(event, 'notes')}/>
        </Grid> 
        <Grid className={classes.submitButton}>
          <Button style={{marginRight: "1000"}} variant="contained" onClick={this.submit}>Submit</Button>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

