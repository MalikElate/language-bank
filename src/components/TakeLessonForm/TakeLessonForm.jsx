import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Button, 
  Box, 
  TextField
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

class TakeLessonForm extends Component {

  state = { 
    newStudent: { 
      name: '', 
      email: '',
      class: '', 
      lessonId: this.props.match.params.lessonId
    }
  }

  componentDidMount() {    
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
        {JSON.stringify(this.props.reduxState)}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block"}}>
            <Grid  
              container
              direction="column"
              justify="center"
              alignItems="center" 
              > 
              <TextField label="Name" variant="outlined" style={{display: "block", margin: "10px"}} 
              onChange={(event)=> this.handleChangeFor(event, 'name')} value={this.state.newStudent.name}/>
              <TextField label="Email" variant="outlined" style={{display: "block", margin: "10px"}} 
              onChange={(event)=> this.handleChangeFor(event, 'email')} value={this.state.newStudent.email}/>
              <TextField label="Class" variant="outlined" style={{display: "block", margin: "10px"}} 
              onChange={(event)=> this.handleChangeFor(event, 'class')} value={this.state.newStudent.class}/>
            </Grid>
            {/* <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete</Button> */}
            <Grid className={classes.buttonGrid}>
              <Button className={classes.root} variant="contained" onClick={ () => {
                this.props.history.push(`/take-lesson`); 
                }}>Back</Button>
              <Button  variant="contained" onClick={ () => {
                this.props.dispatch({type: "ADD_STUDENT", payload: this.state.newStudent}); 
                this.props.history.push(
                  // path="/take-lesson/question/:lessonId/:questionId"
                  `/take-lesson/question/${this.state.newStudent.lessonId}/${this.props.reduxState.question.currentLessonQuestions[0]?.id}`
                  ); 
                }}>Start</Button>
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

export default connect(mapStateToProps)(withStyles(styles)(TakeLessonForm))