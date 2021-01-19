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
  grow: { 
    flexGrow: 1
  }, 
  headerCell: { 
    backgroundColor: "#95bf74",
    color: 'white'
  }, 
  tableRow: {
    "&:hover": {
      backgroundColor: "blue !important"
    }
  }
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
            <Grid style={{textAlign: 'left', display: 'inline-block', marginRight: '60%'}}>
            {/* ------------------------------- Gid containing delete, and edit or delete buttons----------------- */}
              <Typography variant="h4" color="primary" >Lessons</Typography> 
            </Grid> 
            <Button variant="contained" className={classes.grow} onClick={() => {  
              this.props.history.push('/create-lesson');
            }} >Create a lesson</Button>
          </Grid>
          <Grid
          item lg={12} sm={12} xs={12}
          style={{ padding: 20}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headerCell}>Lesson name</TableCell>
                  <TableCell className={classes.headerCell}>Language</TableCell>
                  <TableCell className={classes.headerCell}>Description</TableCell>
                  <TableCell className={classes.headerCell}>Lesson code</TableCell>
                  <TableCell className={classes.headerCell}>Details page</TableCell>
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

