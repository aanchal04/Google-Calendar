import React, { Component } from 'react';
import './App.css';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

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
    
    render() {
    return (
      <div className="App">
            <CalendarHeader onchange = {this.weekdateChange} />
            <CalendarBody weekDate = {this.state.weekDate}/>
      </div>
    );
  }
}

export default App;
