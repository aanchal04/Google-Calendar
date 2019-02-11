import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import EventViewBox from './EventViewBox'

const styles = theme => ({
  EventHolder : 
 {
    background: "#5cb3e6",
    zIndex : "2",
    position: "relative",
    fontSize: "16px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    color: "white"
  }
});

class EventHolder extends Component {
    constructor(props) {
    super(props);     
        this.state = {
            weekDate : new Date()
        }
    }    
    eventClick = (e) => {
          e.preventDefault()
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          let Key = e.target.id;
          let EventData = this.props.Events[Key];
          let eventStartDate = EventData.startDate;
          let container = document.getElementById('EventGridBox');  
          container.style.display = "block";
          ReactDOM.render(<EventViewBox weekdateChange = {this.props.weekdateChange} keyid = {Key} editEvent = {this.props.editEvent} deleteEvent = {this.props.deleteEvent} Events = {this.props.Events}/>, container);
    }
                          
    render() {
    const { classes } = this.props;
    var divStyle = {
        height : this.props.height,
        width : this.props.width
    };
    return (
      <div className = "EventHolder"  style={divStyle} onClick = {this.eventClick} id = {this.props.eventid} title = {this.props.Title}> 
        {this.props.Title} 
      </div>
    );
  }
}

export default withStyles(styles)(EventHolder);