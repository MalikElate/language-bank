import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnswerForm from '../AddAnswerForm/AddAnswerForm'; 
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
    this.props.dispatch({type: 'GET_ANSWERS', payload: this.props.question.id})   
  }

    render() {
    const { classes } = this.props; 
    return (
      <Grid> 
        {JSON.stringify(this.props.question)}
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
          {/* {
            this.props.question.map((question) => 
              <p>test</p>
            )
          } */}
        </Grid>
          <Button variant="contained">Add answer</Button>
        </Grid>  
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

