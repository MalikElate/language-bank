import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import MapChart from "./MapChart";
// import WorldMap from 'react-world-map';
import ReactGlobe from 'react-globe';
import { defaultBarMarkerOptions, defaultDotMarkerOptions } from 'react-globe';
import {
  Grid,
  withStyles,
 } from '@material-ui/core';

const styles = { 

}

class WorldMapComponent extends Component {
  render() {
    const { classes } = this.props; 
    const options= {
      enableMarkerGlow: true,
      markerRadiusScaleRange: [0.005, 0.02],
      markerType: 'dot',
      cameraRotateSpeed: 1,
      markerTooltipRenderer: marker =>
      `${marker.country}, ${marker.value} languages`
    }
    const markers = [ 
      {
        "id": "marker1",
        "country": "Papua New Guinea",
        "color": "red",
        "coordinates": [
          6.3150,
          143.9555
        ],
        "value": 840
      },
      {
        "id": "marker2",
        "country": "Indonesia",
        "color": "blue",
        "coordinates": [
          0.7893,
          113.9213
        ],
        "value": 711
      },
      {
        "id": "marker3",
        "country": "Nigeria",
        "color": "orange",
        "coordinates": [
          9.0820,
          8.6753
        ],
        "value": 517
      },
      {
        "id": "marker4",
        "country": "India",
        "color": "gold",
        "coordinates": [
          20.5937,
          78.9629
        ],
        "value": 456
      },
      {
        "id": "marker5",
        "country": "United States",
        "color": "green",
        "coordinates": [
          37.0902,
          -95.7129
        ],
        "value": 328
      },
      {
        "id": "marker6",
        "country": "Australia",
        "color": "gold",
        "coordinates": [
          -25.2744,
          133.7751
        ],
        "value": 312
      },
      {
        "id": "marker7",
        "country": "China",
        "color": "gold",
        "coordinates": [
          35.8617,
          104.1954
        ],
        "value": 309},
        {
          "id": "marker8",
          "country": "Mexico",
          "color": "gold",
          "coordinates": [
            23.6345,
            -102.5528
          ],
        "value": 292},
        {
          "id": "marker9",
          "country": "Cameroon",
          "color": "gold",
          "coordinates": [
            7.3697,
            12.3547
          ],
        "value": 272},
        {
          "id": "marker10",
          "country": "Brazil",
          "color": "pink",
          "coordinates": [
            -14.2350,
            -51.9253
          ],
          "value": 221}
      ]
    return (
      <div>
       <ReactGlobe
        height="90vh"
        globeBackgroundColor="black"
        globeCloudsTexture={null}
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
        initialCoordinates={[8.7832, 34.5085]}
        markers={markers}
        options={options}
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