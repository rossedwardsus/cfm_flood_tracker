import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

class App extends Component<any, any> {
  
  constructor(props: any) {
      super(props);
      
      this.state = {data: [{event: "level_mm", data: 584, coreid: 400036001751353338363036, published_at: "2019-02-18 16:30:21 -0500"}],
                    data_as_list_formatted: ""};
  }

  componentDidMount = () => {


  }

  formatPublishedAt = (datetime: any) => {

    return "format publishedat"

  }

  //view as char and as list
  changeView = (type: any, e: any) => {
    e.preventDefault();
    //alert(type)

    let date_time = moment("2019-02-18 16:30", "YYYY-MM-DD HH:mm:ss")
    //.format("MM-DD-YYYY");
    // hh:mm A');
    let day_of_week = date_time.format("dddd");
    let month = date_time.format("MMM");
    let date = date_time.day();
    let time = date_time.format("hh:mm:ss A");
    //let minutes = date_time.minutes();
    //let seconds = date_time.seconds();

    //alert(day_of_week + " " + month + " " + date + ", year " + time);

    //loop through data and format datetime
    let formatted_data = this.state.data.map((data: any ) => <div>{data.event}<br/>{data.data}<br/>{data.coreid.toString()}<br/>{this.formatPublishedAt(data.published_at)}</div>);
    //alert(JSON.stringify(formatted_data));
    this.setState({data_as_list_formatted: formatted_data});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to the Code for Miami Flood Tracker!
          </p>
          <br/>
          <a href="#" onClick={(e: any) => this.changeView("list", e)}>
            List
          </a>
           <a href="#" onClick={(e: any) => this.changeView("graph", e)}>
            Graph
          </a>
          <br/>
          {this.state.data_as_list_formatted}
          <br/>
        </header>
      </div>
    );
  }
}

export default App;
