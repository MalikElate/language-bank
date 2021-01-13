import React from 'react';
import {
  Grid,
  withStyles,
  Typography, 
  Button
 } from '@material-ui/core';

class InfoPage extends React.Component {

  render() {
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

export default InfoPage;
