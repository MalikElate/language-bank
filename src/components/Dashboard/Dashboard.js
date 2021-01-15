import React, { Component } from 'react';
import { connect } from 'react-redux';
import LessonTableRow from '../LessonTableRow/LessonTableRow'; 
import {
  Grid,
  withStyles, 
  Typography, 
  Button, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 

 } from '@material-ui/core';

const styles = { 
  
}

class Dashboard extends Component {

  componentDidMount() { 
    console.log('-----------------------dashboard mounted----------------------'); 
    this.props.dispatch({type: "GET_ALL_LESSONS"}); 
  }


  render() { 
   const { classes } = this.props; 
    return (
      <Grid
          container
          direction="row"
          style={{ backgroundImage: "url('./images/image100.png')", }}
          > 
          <Grid
          item lg={12} sm={12} xs={12}
          style={{ padding: 20}}
          >
            <Typography variant="h3">Lessons</Typography> 
            <Button variant="contained"  onClick={() => {
              this.props.history.push('/createlesson');
            }} >Create a lesson</Button>
          </Grid>
          <Grid
          item lg={12} sm={12} xs={12}
          style={{ padding: 20}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lesson Name</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Lesson Code</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { 
                  this.props.reduxState.lesson.allUserLessons.map((lesson, i) => 
                    <LessonTableRow key={i} lesson={lesson}/>
                  )
                }
              </TableBody>
            </Table> 
          </Grid>
        </Grid>
    )
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))

