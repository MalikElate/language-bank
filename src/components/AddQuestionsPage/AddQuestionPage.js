import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddQuestionForm from '../AddQuestionsForm/AddQuestionForm';
import {
  Grid,
  withStyles,
  Typography, 
  TextField, 
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
    this.props.dispatch({type: 'ADD_LESSON', payload: this.state.newLesson}); 
  }

  render() {
    const { classes } = this.props; 
    return (
      <Grid> 
        <Typography variant="h4">Hello from add question page</Typography>
        <Grid  
          container
          direction="column"
          justify="center"
          alignItems="center" 
          >
        <Grid  
          container
          direction="row"
          justify="center"
        >
          <TextField label="Question" variant="outlined" style={{display: "block"}} />
          <Button variant="contained">Delete Question</Button>
        </Grid> 
        <Grid  
          container
          direction="row"
          justify="center"
        >
          <TextField label="Answer" variant="outlined" style={{display: "block"}} />
          <Checkbox/>
          <Button variant="contained">save answer</Button>
        </Grid>
          <Button variant="contained">Add answer</Button>
          <Button variant="contained">Add question</Button>
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

