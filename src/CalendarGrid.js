import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarRowGrid from './CalendarRowGrid';
import moment from 'moment'
import ReactDOM from 'react-dom';
import EventHolder from './EventHolder'

const styles = theme => ({
  mainrowgridContainer : {
      display: "inline-block",
      width: "13%",
      height: "100%",
      float : "left"
  },
  maingridContainer : {
      display: "inline-block",
      width: "100%",
      height: "100%" ,
      overflow : "auto"
  },
  mainrowtimegridContainer : {
      display: "inline-block",
      width: "6%",
      height: "100%",
      float : "left"
  },
});


class CalendarGrid extends Component {
   constructor(props) {
    super(props);     
        this.state = {
            verticalgridlines: 24,
            horizontalgridlines: 7,
            Events : {}
        }
    }
    
    deleteEventState = (key) =>{
      let EventData = this.state.Events[key];
      let startdate = moment(EventData.startDate).format("DD")
      let starthour = EventData.startTime.format("H")
      let Container = document.getElementById('EventGridBox')
      ReactDOM.unmountComponentAtNode(Container);
      let eventContainer = document.getElementById('EventGridOuterBox')
      eventContainer.style.display = "none";
      delete this.state.Events[key]
      let gridstart = document.getElementById('horizontalRow_' + startdate).querySelectorAll('#VerticalRow_' + starthour)[0];
      ReactDOM.unmountComponentAtNode(gridstart);
      //this.deleteEvent(key);
    } 

    deleteEvent = (key) => {
      let Event = Object.assign({},this.state.Events)
      delete Event[key]
      if(Object.keys(Event).length == 0)
      {
          this.setState({
            Events:{}
          })
      }
      else{
           this.setState({
            Events:Event 
          })
      }
    }
    
    editEventState = (key , EventData) =>{
       //this.state.Events[key] = EventData;
       let Events = Object.assign({},this.state.Events)
       Events[key] = EventData
       this.setState({
          Events:Events 
       }) 
    } 
    
    
    generateDOM = () =>{
    const { classes } = this.props;
    let table = [];
    
    let startOfWeek = moment(this.props.weekDate).startOf('isoWeek');
    let endOfWeek = moment(this.props.weekDate).endOf('isoWeek');

    let days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }    
        
    let j = 0
    let divtimeid = "horizontalTimeRow" + j;
    table.push(<div className = {classes.mainrowtimegridContainer} id = {divtimeid} >
                        <CalendarRowGrid weekdateChange = {this.props.weekdateChange} selectedDate = {this.props.weekDate} events = {this.state.Events} eventupdate = {this.editEventState} eventdelete = {this.deleteEventState} horizontalLine = {j-1} verticallines= {this.state.verticalgridlines} date = {moment(days[j])._d} currdate = {moment(days[j]).format('ddd')} currday = {moment(days[j]).format('DD')}/>
                </div>);
        
        for (let i = 0; i < this.state.horizontalgridlines; i++) 
        {
            let divid = "horizontalRow_" + moment(days[j]).format('DD');
            table.push(<div className = {classes.mainrowgridContainer} id = {divid} >
                            <CalendarRowGrid weekdateChange = {this.props.weekdateChange} selectedDate = {this.props.weekDate} events = {this.state.Events} eventupdate = {this.editEventState} eventdelete = {this.deleteEventState} horizontalLine = {i} verticallines= {this.state.verticalgridlines} date = {moment(days[j])._d} currdate ={moment(days[j]).format('DD')} currday = {moment(days[j]).format('ddd')} />
                        </div>);
            j = j + 1;
        }
    return table;
        
    }
    
    editEventComponents = (startOfWeek , endOfWeek) => 
    {
        let gridContainerelements = document.getElementsByClassName('eventHolderGridContainer');
        let i =0,j=0;
        while(i< gridContainerelements.length)
          {

            ReactDOM.unmountComponentAtNode(gridContainerelements[i]) 
            let childelements = gridContainerelements[i].children
            i++;
          }
        for(let key in this.state.Events)
        {
            let EventDetails = this.state.Events[key];
            if(EventDetails.startDate >= startOfWeek._d && EventDetails.startDate <= endOfWeek._d )
            {
                let sdate = moment(EventDetails.startDate).format("DD")
                let Container = document.getElementById('EventGridBox')
                let starthour = EventDetails.startTime.format("H") 
                let endhour = EventDetails.endTime.format("H")       
                let endkey = moment(EventDetails.endDate).format("DD")
                let smonth = moment(EventDetails.startDate).format("MM")
                let emonth = moment(EventDetails.endDate).format("MM")
                let gridstartCell = document.getElementById('horizontalRow_' + sdate).querySelectorAll('#VerticalRow_' + starthour)[0];
                let gridendCell = document.getElementById('horizontalRow_' + endkey).querySelectorAll('#VerticalRow_' + endhour)[0];
                let eventid = sdate + "_" + starthour + "_" + endkey + "_" + endhour 
                let diff = 1;
                let start = moment(EventDetails.startDate, "DD.MM.YYYY");
                let end = moment(EventDetails.endDate, "DD.MM.YYYY");
                let result = end.diff(start, 'days');
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

               if(endkey !== sdate)
               {
                 width = width +  (result) * gridendCell.clientWidth;
               }
               if(smonth !== emonth)
                {
                    width = width +  gridendCell.clientWidth 
                }
                let divheight = height + "px";
                let divwidth = width + "px";
                ReactDOM.render(<EventHolder weekdateChange = {this.props.weekdateChange} eventid = {eventid} Title = {EventDetails.Title} editEvent = {this.editEventState} deleteEvent = {this.deleteEventState} Events = {this.state.Events} height = {divheight} width = {divwidth}/>, gridstartCell);        
                gridstartCell.classList.add("eventHolderGridContainer");
            }
        }
    }
                                    
    componentWillUpdate()
    {            
        let currentDate = new Date();
        let key = moment(currentDate).format("DD")
        let container = document.getElementById('horizontalRow_' + key);
            if(container !== null)
            {
                let griddateCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDateContainer')[0]; 
                let griddayCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDayContainer')[0]; 
                griddateCell.classList.remove("currentDateCSS");
                griddayCell.style.color = "#7d7373"
            }
    }  
    
    componentDidUpdate()
    {
        let currentDate = new Date();
        let key = moment(currentDate).format("DD")
        let startOfWeek = moment(this.props.weekDate).startOf('isoWeek');
        let endOfWeek = moment(this.props.weekDate).endOf('isoWeek');
        let container = document.getElementById('horizontalRow_' + key);
        if(!(startOfWeek._d >= currentDate || endOfWeek._d <= currentDate))
        {
            if(container !== null)
            {
                let griddateCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDateContainer')[0]; 
                let griddayCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDayContainer')[0]; 
                griddateCell.classList.add("currentDateCSS");
                griddayCell.style.color = "#7d7373"
            }
        }
        
      this.editEventComponents(startOfWeek , endOfWeek)
    }
    
    componentDidMount()
   {
        let currentDate = new Date();
        let key = moment(currentDate).format("DD")
        let griddateCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDateContainer')[0]; 
        let griddayCell = document.getElementById('horizontalRow_' + key).querySelectorAll('#gridheaderDayContainer')[0]; 
        griddateCell.classList.add("currentDateCSS");
        griddayCell.style.color = "#5cb3e6"
   }
    
    render() {
    const { classes } = this.props;
        return (
          <div className={classes.maingridContainer}>
            {this.generateDOM()}
          </div>
        );
    }
}

export default withStyles(styles)(CalendarGrid);
