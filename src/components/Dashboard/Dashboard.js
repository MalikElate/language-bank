import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles, 
  Typography, 
  Button
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
          item lg={6} sm={6} xs={12}
          style={{ padding: 20}}>
            <Typography variant="h3">Lessons</Typography> 



          </Grid>
          <Grid
          item lg={6} sm={6} xs={12}
          style={{ padding: 20}}
          >
            <Button variant="contained"  onClick={() => {
              this.props.history.push('/createlesson');
            }} >Create a lesson</Button>
          </Grid>
        </Grid>
    )
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard))

