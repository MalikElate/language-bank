import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormLabel
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
      notes: '',
      public: true
    }, 
    lessonCreated: false, 
  };

  handleChangeFor = (event, inputType) => { 
    if (inputType !== 'public') { 
      this.setState({ 
        newLesson: {
          ...this.state.newLesson, 
          [inputType]: event.target.value
        }
      })
    } else { 
      this.setState({ 
        newLesson: {
          ...this.state.newLesson, 
          [inputType]: this.str2bool(event.target.value) 
        }
      })
    }
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

  str2bool = (value) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
  }
  render() {
    console.log(this.state.newLesson.public)
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
        <Typography variant="h4" color="primary">Create a lesson </Typography> 
        <Grid  
          container
          direction="column"
          justify="center"
          alignItems="center" 
          > 
          <TextField label="Lesson Name" variant="outlined" style={{display: "block", margin: "10px"}} 
          onChange={(event)=> this.handleChangeFor(event, 'lessonName')} value={this.state.newLesson.lessonName}/>
          <TextField label="Language" variant="outlined" style={{display: "block", margin: "10px"}} 
          onChange={(event)=> this.handleChangeFor(event, 'language')} value={this.state.newLesson.language}/>
          <TextField label="Description" variant="outlined" style={{display: "block", margin: "10px"}} 
          onChange={(event)=> this.handleChangeFor(event, 'description')} value={this.state.newLesson.description}/>
          <TextField label="Notes Link" variant="outlined" style={{display: "block", margin: "10px"}} 
          onChange={(event)=> this.handleChangeFor(event, 'notes')} value={this.state.newLesson.notes}/>
          <FormControl component="fieldset">
            <FormLabel component="legend">Do you want you lesson to be public?</FormLabel>
            <RadioGroup row >
                <FormControlLabel 
                value={true}  
                onChange={(event)=>this.handleChangeFor(event, "public")} 
                control={<Radio />} label="Public" 
                checked={this.state.newLesson.public}
                />
                <FormControlLabel 
                value={false} 
                onChange={(event)=>this.handleChangeFor(event, "public")} 
                checked={!this.state.newLesson.public} control={<Radio />} label="Private" 
                />
            </RadioGroup>
          </FormControl>
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

