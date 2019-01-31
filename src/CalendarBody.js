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
      left: "250px",
      boxShadow : "0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)",
      borderRadius : "20px"
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
