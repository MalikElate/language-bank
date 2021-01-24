import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import MapChart from "./MapChart";
// import WorldMap from 'react-world-map';
import ReactGlobe from 'react-globe';
import {
  Grid,
  withStyles,
 } from '@material-ui/core';

const styles = { 

}

class WorldMapComponent extends Component {
  render() {
    const { classes } = this.props; 
  //   const geoUrl =
  // "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
    return (
      <div>
       <ReactGlobe
        height="100vh"
        wglobeBackgroundColor="black"
        globeCloudsTexture={null}
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
        initialCoordinates={[1.3521, 103.8198]}
        // markers={markers}
        // options={options}
        width="100vw"
        onClickMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
        // onGetGlobe={setGlobe}
        onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
        onGlobeTextureLoaded={() => console.log('globe loaded')}
        onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
        />
    </div>
    );
  }
}

const mapStateToProps = reduxState => ({  
  reduxState
});

export default connect(mapStateToProps)(withStyles(styles)(WorldMapComponent))