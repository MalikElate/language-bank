import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Grid,
  withStyles,
  Typography, 
  Button
 } from '@material-ui/core';

const styles = { 

}

class LessonDetails extends Component {
  state = {
  };

  componentDidMount() { 
    this.props.dispatch({type: 'GET_QUESTIONS', payload: this.props.match.params.lessonId});
  }

  deleteLesson = () => { 
      if (window.confirm('Are you sure you want to delete this lesson?', this.props.match.params.lessonId, this.props.reduxState.user.id)) {
        this.props.dispatch({type: 'DELETE_LESSON', payload: {
          lessonId: this.props.match.params.lessonId, userId: this.props.reduxState.user.id} 
        }); 
        this.props.history.push('/dashboard'); 
    }
  }
  editLesson = () => { 
    console.log('editing lesson')
  }
  render() {
    const { classes } = this.props; 
    return (
      <>
        user id:
        {JSON.stringify(this.props.reduxState.user.id)}
        <Typography variant="h4">{}</Typography> 
        <Grid  direction="row" container> 
          <Grid item item lg={6} sm={6} xs={12}> 
            <Button onClick={this.editLesson}>Edit</Button>
            <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete</Button>
          </Grid>
          <Grid item item lg={6} sm={6} xs={12}> 
            <Button onClick={this.editLesson}>Edit</Button>
            <Button variant="contained" color="primary" onClick={this.deleteLesson}>Delete</Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(LessonDetails))