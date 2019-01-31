import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
import ReactDOM from 'react-dom';
import './datetime.css';
import EventBox from './EventBox'

const styles = theme => ({
  OuterEventConatiner : {
      display: "inline-block",
      width: "100%",
      height: "100%",
  },
  OuterEventAction : {
      display: "inline-block",
      width: "95%",
      height: "15%",
      lineHeight : "2"
  },
  OuterEventTextConatiner : {
      display: "inline-block",
      width: "100%",
      height: "40%",
      marginTop : "3%"
  },
  CloseAction : {
      display: "inline-block",
      width: "6%",
      height: "100%",
      float : "right",
      cursor : "pointer",
      fontFamily : "sans-serif",
      fontSize : "16px",
      marginRight : "1%",
  },
  DeleteAction : {
      display: "inline-block",
      width: "6%",
      height: "100%",
      float : "right",
      cursor : "pointer",
  },
  EditAction : {
      display: "inline-block",
      width: "7%",
      height: "100%",
      float : "right",
      cursor : "pointer",
  },
  EventInputConatiner : {
      width: "90%",
      height: "50%",  
      border : "none",
      background : "none",
      marginLeft : "9%",
      float : "left",
      display: "inline-block",
      fontFamily : "sans-serif",
      textAlign : "left",
      fontSize : "35px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow : "ellipsis"
  },
  OuterEventDateTimeConatiner : {
      width: "90%",
      height: "40%",
      display: "inline-block",
      float : "left",
      marginLeft : "5%",
      marginTop : "5%",
  },
  EventInputDateConatiner : {
      width: "90%",
      height: "50%",  
      marginLeft : "5%",
      float : "left",
      display: "inline-block",
      fontFamily : "sans-serif",
      textAlign : "center",
      fontSize : "15px",
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
      ReactDOM.unmountComponentAtNode(container);
      ReactDOM.render(<EventBox weekdateChange = {this.props.weekdateChange} isEdit = {1} keyid = {this.props.keyid} editEvent = {this.props.editEvent} deleteEvent = {this.props.deleteEvent} Events = {this.props.Events}/>, container);
  }

  render() {
    const { classes } = this.props;
    let EventData = this.props.Events[this.props.keyid]
    let Date = moment(EventData.startDate).format("DD MMMM YYYY") + "," + EventData.startTime.format("hh:mm A") + " - " + moment(EventData.endDate).format("DD MMMM YYYY") + "," + EventData.endTime.format("hh:mm A")
    return (
        <div className = {classes.OuterEventConatiner} >
               <div className = {classes.OuterEventAction}>
                    <div className = {classes.CloseAction} onClick = {this.closeEvent} title = "Close"> 
                        <i className="fa fa-close" ></i>
                    </div>
                    <div className = {classes.DeleteAction} onClick = {this.eventDelete} title = "Delete"> 
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                    <div className = {classes.EditAction} onClick = {this.eventEdit} title = "Edit"> 
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                </div>
               <div className = {classes.OuterEventTextConatiner}>
                    <div className = {classes.EventInputConatiner} title = {EventData.Title}> {EventData.Title} </div>
                    <div className = {classes.EventInputDateConatiner}> {Date} </div>
               </div>
               <div className = {classes.OuterEventDateTimeConatiner}>
               </div>
        </div>
    );
  }
}

export default withStyles(styles)(EventViewBox);