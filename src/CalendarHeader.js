import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import DatePicker from "react-datepicker";
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import './App.css'

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
      lineHeight : "3.5",
  },
  calendarText : {
      display: "inline-block",
      width: "60%",
      height: "80%",
      textAlign : "left",
      fontFamily : "sans-serif",
      fontSize : "21px",
      lineHeight : "1.5",
      color : "#7d7373"
  },
  calendaricon : {
      display: "inline-block",
      width: "30%",
      height: "80%",
      float : "left",
      textAlign : "right"
  },
  calendarWeek : {
      display: "inline-block",
      width: "30%",
      height: "80%",
      float :"left",
      marginLeft : "5%",
      lineHeight : "4",
  },
  weekDatePicker : {
      textAlign : "left",
      fontFamily : "sans-serif",
      fontSize : "26px",
      lineHeight : "1.5",
      color : "#615454",
      cursor : "pointer"
  },
 calendarWeekTransition : {
      display: "inline-block",
      width: "5%",
      height: "100%",
      float :"left",
      lineHeight : "3.5",
  },
 calendarPreviousWeek : {
      width: "50%",
      height: "100%",
      float :"left",
 },
 calendarNextWeek: {
      width: "50%",
      height: "100%",
      float :"left",
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
    
    setPreviousWeek = () => {
        let date = moment(this.props.weekDate, "DD.MM.YYYY");
        date.subtract(7, 'days');
        this.changeWeekDate(date._d)
    }
    
    setNextWeek = () => {
        let date = moment(this.props.weekDate, "DD.MM.YYYY");
        date.add(7, 'days');
        this.changeWeekDate(date._d)
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
            <div className = {classes.calendarWeekTransition}>
                <div className={classes.calendarPreviousWeek} title = "Previous Week" onClick= {this.setPreviousWeek}>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div className={classes.calendarNextWeek} title = "Next Week" onClick= {this.setNextWeek}>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>        
            </div>
            <div className = {classes.calendarWeek} id= "headerCalendarWeek">
                <DatePicker className = {classes.weekDatePicker} dateFormat="MMMM YYYY" selected={this.props.weekDate} onChange={this.handleweekdateChange} />
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarHeader);
