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
  itemGrid: { 
    minHeight: "40vh"
  }
}

class TakeLessonConfirmation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        {/* <Typography variant="h4">{}</Typography>  */}
        {/* {JSON.stringify(this.props.reduxState.answer.currentLessonAnswers)} */}
        <Grid style={{margin: "3%"}}>
          <Box boxShadow={2} style={{padding: "5%", display: "block", backgroundColor: "white"}}>
            <Grid  
              container
              direction="column"
              alignItems="center" 
              className={classes.itemGrid}
            > 
              <Typography>You lesson is complete!</Typography>
              <Typography style={{marginTop: "30px"}}>The information has been saved for your instructors review</Typography>
              <Grid
                direction="row"
                style={{marginTop: "15%"}}
              >
                <Button variant="contained" style={{marginRight: "20px"}} onClick={()=> { 
                  this.props.history.push("/take-lesson")
                }}>Keep Learning</Button>
                <Button variant="contained" style={{marginLeft: "20px"}} onClick={()=> { 
                  this.props.history.push("/create-lesson")
                }}>Create a lesson</Button>
              </Grid>
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