import React, { Component } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  app : {
      display: "inline-block",
      width: "100%",
      height: "100%",
      textAlign : "center"
  }
});

class App extends Component {
    constructor(props) {
    super(props);     
        this.state = {
            weekDate : new Date()
        }
    }
    
    weekdateChange = (date) => {
            this.setState({
                weekDate: date
            });
    }
    
    componentWillMount()
    {
        let element = document.getElementById("root")
        let height = window.innerHeight - 3
        let width = window.innerWidth 
        element.style.height = height
        element.style.width = width
    }
    
    render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
            <CalendarHeader weekDate = {this.state.weekDate} onchange = {this.weekdateChange} />
            <CalendarBody weekdateChange = {this.weekdateChange} weekDate = {this.state.weekDate}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
