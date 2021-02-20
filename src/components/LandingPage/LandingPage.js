import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import WorldMap from '../WorldMap/WorldMap';
import {
  Grid,
  withStyles,
  Typography, 
  Button
 } from '@material-ui/core';

 const styles = {
  createLessonButton: { 
    position: "absolute",
    top: "20%",
    left: "10%",
  }, 
  takeLessonButton: { 
    position: "absolute",
    top: "30%",
    left: "10%",
  }
};

class LandingPage extends Component { 
  

  render() {
    const { classes } = this.props;
    return (
      <>
          <div className={classes.buttonGrid} >
            <Button variant="contained" color="secondary" className={classes.takeLessonButton} onClick={ () => { 
              this.props.history.push('/take-lesson');
            }}>Take a lesson</Button>
            <Button variant="contained" color="secondary"  className={classes.createLessonButton} onClick={ () => { 
              this.props.history.push('/create-lesson'); 
            }} >Create a lesson</Button>
          </div>
            <WorldMap/>  
        </>
    );
  }
}

export default withRouter(withStyles(styles)(LandingPage));