import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAnswerForm from '../AddAnswerForm/AddAnswerForm'; 
import axios from 'axios'
import {
  Grid,
  withStyles,
  TextField, 
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
   this.getAnswers(); 
   console.log('mounting add question form')
  }

  state = { 
    answers: [], 
    remountKey: (new Date()).getTime(),
  }

  getAnswers = () => { 
    axios.get(`/api/answer/${this.props.question.id}`)
      .then((response => { 
        this.setState({ 
          answers: response.data
        })
      }))
      .catch((error) => { 
        console.log('error in answer get', error)
      })
  }

  deleteQuestion = () => { 
    console.log('DELETING question', this.props.question.id); 
    this.props.dispatch({type: 'DELETE_QUESTION', payload: this.props.question.id}); 
  }

  addAnswer = () => { 
    console.log('POSTING answer to question with id:', this.props.question.id); 
    this.props.dispatch({type: 'ADD_ANSWER', payload: this.props.question.id});
    this.setState({
      remountKey: this.state.remountKey,
    });
    this.getAnswers();  
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
              <AddAnswerForm key={this.state.remountKey + i} answer={answer}/>
            )
          }
        </Grid>
          <Button variant="contained" onClick={this.addAnswer}>Add answer</Button> 
        </Grid>  
        <div>{this.state.remountKey} {JSON.stringify(this.state.answers)}</div>
      </Grid>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

