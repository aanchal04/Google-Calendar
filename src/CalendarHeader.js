import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import DatePicker from "react-datepicker";

const styles = theme => ({
  mainheaderContainer : {
      display: "inline-block",
      width: "100%",
      height: "9%",
      borderBottom : "1px solid #cccaca"
  },
  calendartextContainer : {
      display: "inline-block",
      width: "20%",
      height: "100%" ,
      float : "left" ,
      marginTop : "1%"
  },
  calendarText : {
      display: "inline-block",
      width: "60%",
      height: "80%",
      textAlign : "left",
      fontFamily : "sans-serif",
      fontSize : "24px",
      lineHeight : "1.5",
      color : "#7d7373"
  },
  calendaricon : {
      display: "inline-block",
      width: "30%",
      height: "80%",
      float : "left",
      textAlign : "right"
  }
});

class CalendarHeader extends Component {
    constructor(props) {
    super(props);     
        this.state = {
            changedweekDate : new Date()
        }
    }
    
    handleweekdateChange = (date) => {
        this.changeWeekDate(date)
    }
    
    changeWeekDate = (date) => {
        this.props.onchange(date);
    }
    
    render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainheaderContainer}>
            <div className={classes.calendartextContainer}>
                <div className={classes.calendaricon}>
                    <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
                </div>
                <span className = {classes.calendarText}> Calendar </span>
            </div> 
            <div>
                <DatePicker selected={this.state.changedweekDate} onChange={this.handleweekdateChange} />
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarHeader);
