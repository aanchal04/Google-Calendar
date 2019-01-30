import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CalendarRowGrid from './CalendarRowGrid';
import moment from 'moment'
import ReactDOM from 'react-dom';

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
      let gridstartCell = document.getElementById('horizontalRow_' + startdate).querySelectorAll('#VerticalRow_' + starthour)[0];
      ReactDOM.unmountComponentAtNode(gridstartCell);
      delete this.state.Events[key]
      let Container = document.getElementById('EventGridBox')
      ReactDOM.unmountComponentAtNode(Container);
      Container.style.display = "none";
    } 
    
    editEventState = (key , EventData) =>{
       this.state.Events[key] = EventData;
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
                        <CalendarRowGrid events = {this.state.Events} eventupdate = {this.editEventState} eventdelete = {this.deleteEventState} horizontalLine = {j-1} verticallines= {this.state.verticalgridlines} currdate = {moment(days[j]).format('ddd')} currday = {moment(days[j]).format('DD')}/>
                </div>);
        
        for (let i = 0; i < this.state.horizontalgridlines; i++) 
        {
            let divid = "horizontalRow_" + moment(days[j]).format('DD');
            table.push(<div className = {classes.mainrowgridContainer} id = {divid} >
                            <CalendarRowGrid events = {this.state.Events} horizontalLine = {i} verticallines= {this.state.verticalgridlines} currdate ={moment(days[j]).format('ddd')} currday = {moment(days[j]).format('DD')} />
                        </div>);
            j = j + 1;
        }
    return table;
        
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
