import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import MapChart from "./MapChart";
import WorldMap from 'react-world-map';
import {
  Grid,
  withStyles,
 } from '@material-ui/core';

const styles = { 

}

class WorldMapComponent extends Component {
  render() {
    const { classes } = this.props; 
    const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
    return (
      <div>
      {/* <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
          }
        </Geographies>
      </ComposableMap>
      asdfasf */}
      <WorldMap />
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({  
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(WorldMapComponent))