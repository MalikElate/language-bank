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
          // style={{ backgroundImage: "url('./images/image100.png')", }}
          > 
          <Grid
          item lg={12}
          style={{ padding: 20}}>
            <Typography variant="h1" color="primary">Tōpo</Typography> 
          </Grid>
          <WorldMap/>
          <Grid
          className={classes.buttonGrid}
          item lg={12}
          >
            <Button variant="contained" style={{marginRight: '50px'}} onClick={ () => { 
              this.props.history.push('/take-lesson');
            }}>Take a lesson</Button>
            <Button variant="contained" style={{marginLeft: '50px'}} onClick={ () => { 
              this.props.history.push('/create-lesson'); 
            }} >Create a lesson</Button>
          </Grid>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(LandingPage));