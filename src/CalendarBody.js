import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarGrid from './CalendarGrid';

const styles = theme => ({
  mainbodyContainer : {
      display: "inline-block",
      width: "100%",
      height: "90%"
  },
  maineventContainer : {
      display: "none",
      width: "450px",
      height: "200px",
      position : "absolute",
      zIndex : 2,
      backgroundColor : "#f1f1f9",
      top: "150px",
      left: "250px"
  }
});


class CalendarBody extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.mainbodyContainer}>
            <CalendarGrid weekDate = {this.props.weekDate}/>
        </div>
        <div className={classes.maineventContainer} id = "EventGridBox">
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CalendarBody);
