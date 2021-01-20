import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  withStyles,
 } from '@material-ui/core';

const styles = { 

}

class WorldMapComponent extends Component {
  render() {
    const { classes } = this.props; 
    return (
      <Grid>
        Hello from WorldMap
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => ({  
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(WorldMapComponent))