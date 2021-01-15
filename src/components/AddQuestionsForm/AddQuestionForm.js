import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnswerForm from '../AddAnswerForm/AddAnswerForm'; 
import axios from 'axios'
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

  state = { 
    answers: []
  }

  componentDidMount() { 
    // this.props.dispatch({type: 'GET_ANSWERS', payload: this.props.question.id})  
    axios.get(`/api/answer/${this.props.question.id}`)
      .then((response => { 
        console.log('getting answer for question', this.props.question.id, response.data); 
        this.setState({ 
          answers: response.data
        })
      }))
      .catch((error) => { 
        console.log('error in answer get', error)
      })
  }

  deleteQuestion = () => { 
    console.log('deleting question', this.props.question.id); 
    this.props.dispatch({type: 'DELETE_QUESTION', payload: this.props.question.id})
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
          <Button variant="contained" onClick={this.deleteQuestion}>Delete Question</Button>
        </Grid> 
        <Grid  
          container
          direction="row"
          justify="center"
        > 
          {
            this.state.answers.map((answer, i) => 
              <AddAnswerForm key={i} answer={answer}/>
            )
          }
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

