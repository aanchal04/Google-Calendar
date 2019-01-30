import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
import ReactDOM from 'react-dom';
import './App.css';
import EventViewBox from './EventViewBox'

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
      height: "10%",
  },
  CloseAction : {
      display: "inline-block",
      width: "10%",
      height: "100%",
      float : "right",
      cursor : "pointer"
  },
  EventInputConatiner : {
      width: "85%",
      height: "100%",  
      border : "none",
      borderBottom : "1px solid blue",
      background : "none",
      marginLeft : "5%",
      float : "left",
      display: "inline-block",
  },
  OuterEventDateTimeConatiner : {
      width: "85%",
      height: "40%",
      display: "inline-block",
      float : "left",
      marginLeft : "5%",
      marginTop : "5%"
  },
  OuterEventSaveConatiner : {
      width: "100%",
      height: "14%",
      display: "inline-block",
      float : "left",
  },
  EventSaveConatiner : {
      width: "20%",
      height: "100%",
      display: "inline-block",
      float : "right",
      textAlign : "center",
      fontFamily : "sans-serif",
      fontSize : "18px",
      color : "white",
      background : "#6565af",
      lineHeight : "1.5",
      marginRight : "2%",
      cursor : "pointer"
  }
});


class EventBox extends Component {
  constructor(props) {
    super(props);     
        this.state = {
            startDate : new Date(),
            endDate :new Date(),
            startTime : moment().hour(0).minute(0),
            EndTime : moment().hour(0).minute(0),            
            format : 'h:mm a',
        }
    }
  
  handlestartdateChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  
  handleenddateChange = (date) => {
    this.setState({
      endDate: date
    });
  }
  
  onChangeStartTime = (time) => {
    this.setState({
      startTime: time
    });
  }
    
  onChangeEndTime = (time) => {
    this.setState({
      EndTime: time
    });
  }
  
  saveEvent = () => {
      const { classes } = this.props;
      let Title = this._newText.value;
      let EventDetails = {
          Title: Title,
          startDate : this.state.startDate,
          startTime : this.state.startTime,
          endDate : this.state.endDate,
          endTime : this.state.EndTime
      }
      let key = moment(this.state.startDate).format("DD")
      let Container = document.getElementById('EventGridBox')
      let starthour = this.state.startTime.format("H") 
      let endhour = this.state.EndTime.format("H") 
      
      let endkey = moment(this.state.endDate).format("DD")
      let gridstartCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#VerticalRow_' + starthour)[0];
      let gridendCell = document.getElementById('horizontalRow_' + endkey).querySelectorAll('#VerticalRow_' + endhour)[0];
      let eventid = key + "_" + starthour + "_" + endkey + "_" + endhour
      
      if(this.props.isEdit == 1)
      {
        this.props.deleteEvent(this.props.keyid)
      }
 
      let width = gridstartCell.offsetWidth;
      let height = gridstartCell.offsetHeight;
      if((endhour - starthour ) > 1 )
      {
          height = height +  gridendCell.offsetHeight;
      }
      if(endkey != key)
      {
          width = width +  gridendCell.offsetWidth;
      }
      ReactDOM.render(<div className = "EventHolder" onClick = {this.eventClick} id = {eventid} > {Title} </div>, gridstartCell);
 
      let eventCell = gridstartCell.querySelectorAll(".EventHolder")[0];
      eventCell.style.height = height + "px";
      eventCell.style.width = width + "px";
      this.props.editEvent(eventid ,EventDetails)
      ReactDOM.unmountComponentAtNode(Container);
      Container.style.display = "none";
  }
  
  closeEvent = () => {
      let Container = document.getElementById('EventGridBox')
      ReactDOM.unmountComponentAtNode(Container);
      Container.style.display = "none";
  }
  
  componentDidMount()
  {
      if(this.props.isEdit == 1)
          {
              let EventData = this.props.Events[this.props.keyid];
                  this.setState({
                    EndTime: EventData.endTime
                  });
                   
                 this.setState({
                    startTime: EventData.startTime
                  });
                
                this.setState({
                    startDate: EventData.startDate
                });
                this.setState({
                    endDate: EventData.endDate
                });
                 
                document.getElementById("EventInput").value = EventData.Title
          }
      
  }
  
  eventClick = (e) => {
      let Key = e.target.id;
      let EventData = this.props.Events[Key];
      let eventStartDate = EventData.startDate;
      let container = document.getElementById('EventGridBox');  
      container.style.display = "block";
      ReactDOM.render(<EventViewBox keyid = {Key} editEvent = {this.props.editEvent} deleteEvent = {this.props.deleteEvent} Events = {this.props.Events}/>, container);
  }
    
  render() {
    const { classes } = this.props;
    return (
        <div className = {classes.OuterEventConatiner} >
               <div className = {classes.OuterEventAction}>
                    <div className = {classes.CloseAction} onClick = {this.closeEvent}> X </div>
                </div>
               <div className = {classes.OuterEventTextConatiner}>
                    <input type= "text" ref={input => this._newText = input} id = "EventInput" className = {classes.EventInputConatiner}/>
               </div>
               <div className = {classes.OuterEventDateTimeConatiner}>
                          <DatePicker selected={this.state.startDate} onChange={this.handlestartdateChange} />
                          <TimePicker showSecond={false} onChange={this.onChangeStartTime} value={this.state.startTime} format={this.state.format} use12Hours inputReadOnly/>
                          <DatePicker selected={this.state.endDate} onChange={this.handleenddateChange} />
                          <TimePicker showSecond={false} onChange={this.onChangeEndTime} value={this.state.EndTime} format={this.state.format} use12Hours inputReadOnly/>
               </div>
               <div className = {classes.OuterEventSaveConatiner}>
                    <div className = {classes.EventSaveConatiner} onClick = {this.saveEvent}> Save </div>
               </div>
        </div>
    );
  }
}

export default withStyles(styles)(EventBox);