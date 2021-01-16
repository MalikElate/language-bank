import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  TextField, 
  Typography,
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
  deleteAnswer = () => {  
    this.props.dispatch({type: 'DELETE_ANSWER', payload: this.props.answer.id})
  }

  render() {
    console.log("rendering")
    const { classes } = this.props; 
    return (
      <Grid> 
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
          <Typography variant="body1">{this.props.answer.answer}</Typography>
          <Checkbox/>
          <Button variant="contained" onClick={this.deleteAnswer}>delete answer</Button>
        </Grid>
        </Grid>  
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

