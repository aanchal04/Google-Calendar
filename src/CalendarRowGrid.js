import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import EventBox from './EventBox';
import ReactDOM from 'react-dom';
import moment from 'moment'

const styles = theme => ({
  rowgridcell : {
      display: "inline-block",
      width: "100%",
      height: "8%",
      border : "1px solid #e0dcdc",
      float : "left",
  },
  rowContainer : {
      display: "inline-block",
      width: "100%",
      height: "100%",
      float : "left",
  },
  MainDateContainer : {
      display: "inline-block",
      width: "100%",
      height: "10%",
      textAlign : "center",
      fontFamily : "sans-serif",
      color : "#7d7373",
      float : "left"
  },
  DayContainer : {
      display: "inline-block",
      width: "100%",
      height: "40%",
      float : "left",
      fontSize : "16px",
      lineHeight : "1.5"
  },
  DateContainer : {
      display: "inline-block",
      width: "100%",
      height: "50%",
      float : "left",
      fontSize : "22px",
  },
  rowgridtimecell : {
      display: "inline-block",
      width: "100%",
      height: "8%",
      float : "left",
      lineHeight : "0.5",
      border : "1px solid white",
      textAlign : "center",
      fontFamily : "sans-serif",
      fontSize : "11px",
      color : "#7d7373",
  },
  PlusIconContainer : {
      display: "inline-block",
      width: "100%",
      height: "10%",
      cursor : "pointer",
      lineHeight : "3.5",
      cursor : "pointer"
  },
  IconContainer : {
      
  }
});


class CalendarRowGrid extends Component {
  
  addEvent = (e) => {
      let element = document.getElementById('EventGridOuterBox');
      if(element.style.display == "block")
      {
        //do nothing
      }
      else
      {
        element.style.display = "block";
        this.generateEventBox()
      }       
  }  
  
  generateEventBox = () => {
      let container = document.getElementById('EventGridBox');      
      ReactDOM.render(<EventBox selectedTime = {0} selectedDate = {this.props.selectedDate} weekdateChange = {this.props.weekdateChange} isEdit = {0} keyid = {0} editEvent = {this.props.eventupdate} deleteEvent = {this.props.eventdelete} Events = {this.props.events}/>, container);
  }

  generateEventGridBox = (Time) => {
      let container = document.getElementById('EventGridBox');      
      ReactDOM.render(<EventBox selectedTime = {Time} selectedDate = {this.props.date} weekdateChange = {this.props.weekdateChange} isEdit = {0} keyid = {0} editEvent = {this.props.eventupdate} deleteEvent = {this.props.eventdelete} Events = {this.props.events}/>, container);
  }

  openEventBox = (e) =>{
      let Time = e.target.id.split("_")[1];
      let element = document.getElementById('EventGridOuterBox');
      if(element.style.display == "block")
      {

      }
      else
      {
        element.style.display = "block";
        this.generateEventGridBox(Time)
      }
}

  generatetimerow = () =>{
    const { classes } = this.props;
    let table = [];
    
   if(this.props.horizontalLine < 0)
        {
            let time = "";
            let k = 0;
            let j = 0;
            for (let i = 0; i < this.props.verticallines; i++)
            {            
                let divtimeid = "VerticalRow_time_" + i;
                if(i === 0)
                {
                    table.push(<div className = {classes.PlusIconContainer}>
                                    <div onClick = {this.addEvent}>
                                        <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
                                    </div>
                                </div>)
                }
                if(k === 0)
                {
                        time = "12 AM"
                        k++;
                        j = 1;  
                }                
                else if(k < 12)
                    {
                        j = k;
                        time = j + " AM"
                        k++;
                    }
                else if(k === 12)
                    {
                        time = "12 PM"
                        k++;
                        j = 1;
                    }
                else
                   {
                        time = j + " PM"
                        k++;
                        j++;
                   }
                table.push(<div className = {classes.rowgridtimecell} id = {divtimeid}> {time} </div>); 
            }
 
        }
    return table;                     
   }
    

  generaterow = () =>{
    const { classes } = this.props;
    let table = [];
    
    if(this.props.horizontalLine >= 0)
    {
        for (let i = 0; i < this.props.verticallines; i++) 
        {
            let divid = "VerticalRow_" + i;
            if(i === 0)
                {
                    table.push(<div className = {classes.MainDateContainer}>
                                    <div className = {classes.DayContainer} id = "gridheaderDayContainer">
                                        {this.props.currday}
                                        </div>
                                    <div className = {classes.DateContainer} id = "gridheaderDateContainer">
                                        {this.props.currdate}
                                    </div>
                                </div>)
                }
            table.push(<div className = {classes.rowgridcell} id = {divid} onClick = {this.openEventBox} >
                       </div>);
        }
    }
    else
    {
        table =  this.generatetimerow();                        
    }
    
    return table;
   }
            
    render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
          <div className={classes.rowContainer}>
              {this.generaterow()}
          </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CalendarRowGrid);
