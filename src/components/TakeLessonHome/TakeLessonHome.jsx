import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  Typography, 
  Button, 
  TextField, 
  Box, 
  Table, 
  TableHead, 
  TableCell, 
  TableBody, 
  TableRow
 } from '@material-ui/core';

const styles = { 
  submitButton: { 
    textAlign: "right", 
    marginRight: "5%"
  }, 
  root: { 
    flexGrow: 1
  }, 
  boxHeader: { 
    padding: "10px"
  }, 
  itemBox: { 
    minHeight: '75vh'
  },
  headerCell: { 
    backgroundColor: "#95bf74",
    color: 'white'
  }, 
}

class CreateLesson extends Component {

  componentDidMount() { 
    this.props.dispatch({type: 'GET_ALL_PUBLIC_LESSONS'})
  }

  render() {
    const { classes } = this.props; 
    return (
      <>
       <Grid  direction="row" className={classes.root} container> 
          <Grid item sm={7} xs={12} style={{marginLeft: '3%', marginRight: '10px'}} > 
            <Box boxShadow={2} style={{display: "block"}} className={classes.itemBox} style={{padding: '10px'}}>
              <Typography color="primary" variant="h4" className={classes.boxHeader}>Public lessons</Typography> 
              <Table>
                <TableHead> 
                  <TableRow> 
                    <TableCell className={classes.headerCell}>Lesson name</TableCell>
                    <TableCell className={classes.headerCell}>Language</TableCell>
                    <TableCell className={classes.headerCell}>Country of origin</TableCell>
                    <TableCell className={classes.headerCell}>Experience</TableCell>
                    <TableCell className={classes.headerCell}>&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { 
                    this.props.reduxState.lesson.allPublicLessons.map((lesson, i) => (
                      <TableRow key={i}>
                        <TableCell>{lesson.name}</TableCell>
                        <TableCell>{lesson.language}</TableCell>
                        <TableCell>{lesson.country}</TableCell>
                        <TableCell>{lesson.difficulty}</TableCell>
                        <TableCell><Button variant="contained" onClick={ () => {
                          this.props.history.push(`/take-lesson/form/${lesson.id}`)
                        }}>Start</Button></TableCell>
                      </TableRow>
                    ))
                  }    
                </TableBody>
              </Table>
            </Box>
          </Grid>
          <Grid item sm={4} xs={12} > 
            <Box boxShadow={2} style={{display: "block", padding: '10px'}} className={classes.itemBox}>
              <Typography color="primary" variant="h4" className={classes.boxHeader}>Private lessons</Typography>
              <Typography color="primary" variant="body1" className={classes.boxHeader}>
                Enter the private lesson code shared by your instructor.
              </Typography> 
              <Grid style={{marginTop: '5%'}}> 
                <TextField style={{marginLeft: '15px', marginRight: '15px'}}/>
                <Button variant="contained">Start</Button>
              </Grid>        
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

