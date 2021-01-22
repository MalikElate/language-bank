import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Button, 
  Box, 
  Typography
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

class TakeLessonConfirmation extends Component {

  render() {
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        {/* {JSON.stringify(this.props.reduxState.answer.currentLessonAnswers)} */}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block"}}>
            <Grid  
              container
              direction="column"
              justify="center"
              alignItems="center" 
            > 
            hello from confirmation
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

export default connect(mapStateToProps)(withStyles(styles)(TakeLessonConfirmation))