import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from "react-router";
import copy from 'copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai";
import {
  Button, 
  TableRow, 
  TableCell, 
 } from '@material-ui/core';

class LessonTableRow extends Component {
  state = {
    heading: 'Class Component',
  };

  goToDetails = () => { 
    console.log('going to details page for lesson with id', this.props.lesson.id); 
    this.props.history.push(`/lesson/details/${this.props.lesson.id}`);
  }
  
  render() {
    return (
      <TableRow> 
        <TableCell>{this.props.lesson.name}</TableCell>
        <TableCell>{this.props.lesson.description}</TableCell>
        <TableCell>{this.props.lesson.language}</TableCell>
        <TableCell>{this.props.lesson.code}
          <Button style={{marginLeft: "3%"}} onClick={() => { 
            copy(this.props.lesson.code) 
          }}><AiOutlineCopy/>
          </Button> 
        </TableCell>
        <TableCell><Button onClick={this.goToDetails}>Details</Button></TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(LessonTableRow));
