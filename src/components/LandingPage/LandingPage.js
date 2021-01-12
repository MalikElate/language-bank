import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 
import {
  Grid,
  withStyles,
  Typography, 
  Button
 } from '@material-ui/core';

 const styles = {
  buttonGrid: {
    marginTop: '30%',
  },
};

class LandingPage extends Component { 
  

  render() {
    const { classes } = this.props;
    return (
        <Grid
          container
          justify="center"
          alignItems="center" 
          direction="column"
          style={{ backgroundImage: "url('./images/image100.png')", }}
          > 
          <Grid
          item lg={12} sm={12} xs={12}
          style={{ padding: 20}}>
            <Typography variant="h1">Topo</Typography> 
          </Grid>
          <Grid
          className={classes.buttonGrid}
          item lg={12} sm={12} xs={12}
          >
            <Button variant="contained">Take a lesson</Button>
            <Button variant="contained" color="">Create a lesson</Button>
          </Grid>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(LandingPage));