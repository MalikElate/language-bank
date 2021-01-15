import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
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
  componentDidMount() { 
    console.log('mounted answer form')
  }

  deleteAnswer = () => { 
    console.log('deleting answer'); 
    this.props.dispatch({type: 'DELETE_ANSWER', payload: this.props.answer.id})
  }

  render() {
    const { classes } = this.props; 
    return (
      <Grid> 
            {JSON.stringify(this.props.answer)}
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
          <TextField label="Answer" variant="outlined" style={{display: "block"}} />
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

