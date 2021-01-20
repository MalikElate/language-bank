import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddQuestionForm from '../AddQuestionsForm/AddQuestionForm';
import {
  Grid,
  withStyles,
  Typography, 
  Button, 
  TextField, 
  Box
 } from '@material-ui/core';

const styles = { 
  submitButton: { 
    textAlign: "right", 
    marginRight: "5%"
  }, 
  addButton: { 
    marginRight: "5%"
  }, 
  root: { 
    flexGrow: 1
  }, 
  boxHeader: { 
    padding: "10px"
  } 
}

class CreateLesson extends Component {
  state = {
    }

  render() {
    const { classes } = this.props; 
    return (
      <>
       <Grid  direction="row" className={classes.root} container> 
          <Grid item xs={7} style={{marginLeft: '3%', marginRight: '10px'}} > 
            <Box boxShadow={2} style={{display: "block"}} className={classes.itemGrid}>
              <Typography color="primary" variant="h4" className={classes.boxHeader}>Public lessons</Typography>        
            </Box>
          </Grid>
          <Grid item xs={4} > 
            <Box boxShadow={2} style={{display: "block"}} className={classes.itemGrid}>
              <Typography color="primary" variant="h4" className={classes.boxHeader}>Private lessons</Typography>        
              <TextField/>
              <Button variant="contained">Begin</Button>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(CreateLesson))

