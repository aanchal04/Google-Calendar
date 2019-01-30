import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
import ReactDOM from 'react-dom';
import './App.css';

const styles = theme => ({
  OuterEventConatiner : {
      display: "inline-block",
      width: "100%",
      height: "100%",
  },
  OuterEventAction : {
      display: "inline-block",
      width: "100%",
      height: "10%",
  },
  OuterEventTextConatiner : {
      display: "inline-block",
      width: "100%",
      height: "30%",
  },
  CloseAction : {
      display: "inline-block",
      width: "10%",
      height: "100%",
      float : "right",
      cursor : "pointer"
  },
  DeleteAction : {
      display: "inline-block",
      width: "10%",
      height: "100%",
      float : "right",
      cursor : "pointer"
  },
  EditAction : {
      display: "inline-block",
      width: "10%",
      height: "100%",
      float : "right",
      cursor : "pointer"
  },
  EventInputConatiner : {
      width: "85%",
      height: "50%",  
      border : "none",
      background : "none",
      marginLeft : "9%",
      float : "left",
      display: "inline-block",
      fontFamily : "sans-serif",
      textAlign : "left",
      fontSize : "24px"
  },
  OuterEventDateTimeConatiner : {
      width: "85%",
      height: "40%",
      display: "inline-block",
      float : "left",
      marginLeft : "5%",
      marginTop : "5%",
  },
  EventInputDateConatiner : {
      width: "85%",
      height: "50%",  
      marginLeft : "5%",
      float : "left",
      display: "inline-block",
      fontFamily : "sans-serif",
      textAlign : "center",
      fontSize : "16px",
      marginTop : "1%",
  }
});


class EventViewBox extends Component {
  constructor(props) {
    super(props);     
        this.state = {
            startDate : new Date(),
            endDate :new Date(),
            startTime : moment().hour(0).minute(0),
            EndTime : moment().hour(0).minute(0),            
            format : 'h:mm a',
            eventContainerData: {}
        }
    }
  
  closeEvent = () => {
      let Container = document.getElementById('EventGridBox')
      ReactDOM.unmountComponentAtNode(Container);
      Container.style.display = "none";
  }
  
  eventDelete = () => {
      this.props.deleteEvent(this.props.keyid)
  }
    
  eventEdit = () => {
      let container = document.getElementById('EventGridBox'); 

  }

  render() {
    const { classes } = this.props;
    let Date = moment(this.props.Events.endDate).format("DD MMMM YYYY") + "," + this.state.EndTime.format("hh:mm A") +
               " - " + moment(this.props.Events.startDate).format("DD MMMM YYYY") + "," + this.props.Events.startTime.format("hh:mm A") 
    return (
        <div className = {classes.OuterEventConatiner} >
               <div className = {classes.OuterEventAction}>
                    <div className = {classes.CloseAction} onClick = {this.closeEvent}> X </div>
                    <div className = {classes.DeleteAction} onClick = {this.eventDelete}> 
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                    <div className = {classes.EditAction} onClick = {this.eventEdit}> 
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                </div>
               <div className = {classes.OuterEventTextConatiner}>
                    <div className = {classes.EventInputConatiner}> {this.props.Events.Title} </div>
                    <div className = {classes.EventInputDateConatiner}> {Date} </div>
               </div>
               <div className = {classes.OuterEventDateTimeConatiner}>
               </div>
        </div>
    );
  }
}

export default withStyles(styles)(EventViewBox);