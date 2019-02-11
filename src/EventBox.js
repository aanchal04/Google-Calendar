import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import moment from 'moment'
import 'rc-time-picker/assets/index.css';
import ReactDOM from 'react-dom';
import './datetime.css';
import EventViewBox from './EventViewBox'
import EventHolder from './EventHolder'

const styles = theme => ({
  OuterEventConatiner : {
      display: "inline-block",
      width: "100%",
      height: "100%",
  },
  OuterEventAction : {
      display: "inline-block",
      width: "100%",
      height: "11%",
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
      cursor : "pointer",
      fontFamily : "sans-serif",
      fontSize : "18px",
      marginRight : "1%",
      lineHeight : "1.5"
  },
  EventInputConatiner : {
      width: "85%",
      height: "100%",  
      border : "none",
      borderBottom : "1px solid blue",
      background : "none",
      marginLeft : "5%",
      float : "left",
      display: "inline-block"
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
      height: "12%",
      display: "inline-block",
      float : "left",
      marginTop : "2%"
  },
  EventSaveConatiner : {
      width: "15%",
      height: "100%",
      display: "inline-block",
      float : "right",
      textAlign : "center",
      fontFamily : "sans-serif",
      fontSize : "16px",
      color : "white",
      background : "#1a73e8",
      lineHeight : "1.6",
      marginRight : "4%",
      cursor : "pointer",
      borderRadius : "7px"
  },
  eventStartDate : {
      padding: "0px",
      float: "left",
      height: "28px",
      background: "white",
      width : "90px",
      color : "#666",
      paddingLeft : "10%",
      fontSize : "12px",
      color : "#5d5353"
  },
  eventStartHour : {
      padding: "0px",
      float: "left",
  },
  OuterEventEndDateConatiner : {
      width: "100%",
      height: "50%",
      display: "inline-block",
      float : "left",
  },
  OuterEventStartDateConatiner : {
      width: "100%",
      height: "50%",
      display: "inline-block",
      float : "left",
  },
  spanStartTime : {
      float : "left",
      width : "25%",
      fontFamily : "sans-serif",
      fontSize : "15px",
      lineHeight : "2",
      textAlign : "left"
  }
});


class EventBox extends Component {
  constructor(props) {
    super(props);     
        this.state = {
            startDate : this.props.selectedDate,
            endDate :this.props.selectedDate,
            startTime : moment().hour(this.props.selectedTime).minute(0),
            EndTime : moment().hour(this.props.selectedTime).minute(0).add(1, 'hours'),            
            format : 'h:mm a',
        }
    }
  
  handlestartdateChange = (date) => {
    this.setState({
      startDate: date,
      endDate: date
    }); 
    this.props.weekdateChange(date)
    document.getElementById("savecontainer").style.background = "#1a73e8" 
  }
  
  handleenddateChange = (date) => {
    this.setState({
      endDate: date
    });
      if(this.state.startDate > date)
      {
        document.getElementById("savecontainer").style.background = "grey"
      }
      else
      {
         document.getElementById("savecontainer").style.background = "#1a73e8" 
      }
  }
  
  onChangeStartTime = (time) => {
    this.setState({
      startTime: time
    });
      if(this.state.EndTime < time)
      {
        document.getElementById("savecontainer").style.background = "grey"
      }
      else
      {
         document.getElementById("savecontainer").style.background = "#1a73e8" 
      }
  }
    
  onChangeEndTime = (time) => {
    this.setState({
      EndTime: time
    });
      if(this.state.startTime > time)
      {
        document.getElementById("savecontainer").style.background = "grey"
      }
      else
      {
         document.getElementById("savecontainer").style.background = "#1a73e8" 
      }
  }
  
  saveEvent = () => {
      
      if(this.state.startDate > this.state.endDate)
      {
//do nothing
      }
      else
      {
          const { classes } = this.props;
          let Title = this._newText.value;
          if(Title === "")
          {
              Title = "No Title"
          }
          let EventDetails = {
              Title: Title,
              startDate : this.state.startDate,
              startTime : this.state.startTime,
              endDate : this.state.endDate,
              endTime : this.state.EndTime
          }
          let key = moment(this.state.startDate).format("DD")
          let smonth = moment(this.state.startDate).format("MM")
          let emonth = moment(this.state.endDate).format("MM")
          let Container = document.getElementById('EventGridBox')
          let starthour = this.state.startTime.format("H") 
          let endhour = this.state.EndTime.format("H") 
          let endminute = this.state.EndTime.format("mm") 
          
          let endkey = moment(this.state.endDate).format("DD")
          let gridstartCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#VerticalRow_' + starthour)[0];
          let gridendCell = document.getElementById('horizontalRow_' + endkey).querySelectorAll('#VerticalRow_' + endhour)[0];
          let eventid = key + "_" + starthour + "_" + endkey + "_" + endhour

          if(this.props.isEdit == 1)
          {
            this.props.deleteEvent(this.props.keyid)
            let gridContainerelements = document.getElementsByClassName('eventHolderGridContainer');
            let i =0,j=0;
            while(i< gridContainerelements.length)
            {
                j = 0;
                let childelements = gridContainerelements[i].children
                 while(j < childelements.length)
                {
                    if(childelements[j].id === this.props.keyid)
                    {
                        childelements[j].remove()   
                    }
                    j++;
                }
                i++;
            }
          }
          let start = moment(this.state.startDate, "DD");
          let endd = moment(this.state.endDate, "DD");
          let result = endd.diff(start, 'days')
          const a = new Date(EventDetails.startDate),
          b = new Date(EventDetails.endDate)  

          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
          const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
          const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

          result = Math.floor((utc2 - utc1) / _MS_PER_DAY);

          let width = gridstartCell.clientWidth;
          let height = gridstartCell.clientHeight;
          if((endhour - starthour ) > 1 )
          {
              height = height +  (endhour - starthour - 1) * gridendCell.clientHeight;
          }
          
          if(endminute < 30 && endminute > 0)
          {
              height = height + gridendCell.clientHeight/2;
          }
          else
          {
              if(endminute > 0)
              {
                height = height + gridendCell.clientHeight;
              }
          }
          result = parseInt(result)
          if(endkey !== key)
          {
             width = width +  (result) * gridendCell.clientWidth; 
          }
          
          let divheight = height + "px";
          let divwidth = width + "px";
         // ReactDOM.render(<EventHolder weekdateChange = {this.props.weekdateChange} eventid = {eventid} Title = {EventDetails.Title} editEvent = {this.props.editEvent} deleteEvent = {this.props.deleteEvent} Events = {this.props.Events} height = {divheight} width = {divwidth}/>, gridstartCell);
          gridstartCell.classList.add("eventHolderGridContainer");
          this.props.editEvent(eventid ,EventDetails)
          ReactDOM.unmountComponentAtNode(Container);
          Container.style.display = "none";
      }
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
      
  render() {
    const { classes } = this.props;
    return (
        <div className = {classes.OuterEventConatiner} >
               <div className = {classes.OuterEventAction}>
                    <div className = {classes.CloseAction} onClick = {this.closeEvent} title = "Close"> 
                        <i className="fa fa-close" ></i>
                    </div>
                </div>
               <div className = {classes.OuterEventTextConatiner}>
                    <input type= "text" ref={input => this._newText = input} id = "EventInput" className = {classes.EventInputConatiner} placeholder = "Add Title" />
               </div>
               <div className = {classes.OuterEventDateTimeConatiner}>
                        <div className = {classes.OuterEventStartDateConatiner}>
                              <span className = {classes.spanStartTime}> Start Time </span>
                              <DatePicker className = {classes.eventStartDate} selected={this.state.startDate} onChange={this.handlestartdateChange} />
                              <TimePicker className = {classes.eventStartHour} showSecond={false} onChange={this.onChangeStartTime} value={this.state.startTime} format={this.state.format} use12Hours inputReadOnly/>
                        </div>
                        <div className = {classes.OuterEventEndDateConatiner}>
                              <span className = {classes.spanStartTime}> End Time </span>
                              <DatePicker className = {classes.eventStartDate} selected={this.state.endDate} onChange={this.handleenddateChange} />
                              <TimePicker className = {classes.eventStartHour} showSecond={false} onChange={this.onChangeEndTime} value={this.state.EndTime} format={this.state.format} use12Hours inputReadOnly/>
                        </div>
               </div>
               <div className = {classes.OuterEventSaveConatiner}>
                    <div className = {classes.EventSaveConatiner} id = "savecontainer" onClick = {this.saveEvent}> Save </div>
               </div>
        </div>
    );
  }
}

export default withStyles(styles)(EventBox);