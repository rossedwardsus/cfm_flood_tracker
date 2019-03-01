import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import GoogleMapReact from 'google-map-react';

import {Chart} from 'react-google-charts';

import { BrowserRouter as Router, Route, Link, match, withRouter, Redirect, Switch } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  table: {
    maxWidth: 100,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed' as 'fixed',
    bottom: 0,
  }
};

class FloodTracker extends Component<any, any> {
  
  constructor(props: any) {
      super(props);
      
      this.state = {data: [{event: "level_mm", data: 584, coreid: 400036001751353338363036, published_at: "2019-02-18 16:30:21 -0500"}],
                    chart_data: [{data: 584, published_at: "16:30:21"}], data_as_list_formatted: "", activeTab: 0, anchorEl: null, menuOpen: false, date_formatted: "", view_type: "list", current_date: "", bottom_navigation_value: 0};
  }

  componentDidMount = () => {

      let date =  moment();
      let day_of_week = date.format("dddd");
      let month = date.format("MMM");
      let day_of_month = date.format("Do");
      
      let date_as_string = day_of_week + " " + month + " " + day_of_month+ ", year ";

      this.setState({current_date: date});
      this.setState({date_formatted: date_as_string})

      let formatted_data = this.state.data.map((data: any ) => <div>{data.event}<br/>{data.data}<br/>{data.coreid.toString()}<br/>{this.formatPublishedAt(data.published_at)}</div>);
      //alert(JSON.stringify(formatted_data));
      this.setState({data_as_list_formatted: formatted_data});

  }

  formatPublishedAt = (datetime: any) => {

    let date_time = moment(datetime, "YYYY-MM-DD HH:mm:ss")
    //.format("MM-DD-YYYY");
    // hh:mm A');
    let day_of_week = date_time.format("dddd");
    let month = date_time.format("MMM");
    let date = date_time.day();
    let time = date_time.format("hh:mm:ss A");
    let year = date_time.year();
    //let seconds = date_time.seconds();

    //alert(day_of_week + " " + month + " " + date + ", year " + time);

    return day_of_week + " " + month + " " + date + ", " + year + " " + time

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
    
    this.setState({bottom_navigation_value: type});
  }

  incrementDate = (e: any) => {

    //get the date

    let date_time = moment( this.state.current_date, "YYYY-MM-DD HH:mm:ss")
    //.format("MM-DD-YYYY");
    // hh:mm A');
    let date_time_plus_one_day = date_time.add(1,'days')
    let day_of_week = date_time_plus_one_day.format("dddd");
    let month = date_time_plus_one_day.format("MMM");
    let date = date_time_plus_one_day.day();
    let time = date_time_plus_one_day.format("hh:mm:ss A");

    //format the date
    //alert(day_of_week + " " + month + " " + date + ", year " + time);

    this.setState({current_date: date_time_plus_one_day})
    this.setState({date_formatted:  day_of_week + " " + month + " " + date + ", year " + time});

  }

  decrementDate = (e: any) => {

    //get the date

    let date_time = moment(this.state.current_date, "YYYY-MM-DD HH:mm:ss")
    //.format("MM-DD-YYYY");
    // hh:mm A');
    let date_time_minus_one_day = date_time.subtract(1,'days')
    let day_of_week = date_time_minus_one_day.format("dddd");
    let month = date_time_minus_one_day.format("MMM");
    let date = date_time_minus_one_day.day();
    let time = date_time_minus_one_day.format("hh:mm:ss A");

    //format the date
    //alert(day_of_week + " " + month + " " + date + ", year " + time);

    this.setState({current_date: date_time_minus_one_day})
    this.setState({date_formatted:  day_of_week + " " + month + " " + date + ", year " + time});

  }

  handleBottomNavigationChange = (event: any, value: any) => {
    //alert(value);

    this.setState({ bottom_navigation_value: value });
  };



  render() {

    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (<Router>
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <IconButton 
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={false}
                  >
                </Menu>
                
                <Typography variant="h6" color="inherit">
                  Flood Tracker
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.root}>
              <Grid container spacing={0}>
                  <Hidden mdDown>
                    <Grid item xs={1} sm={1} md={2} lg={1} style={{textAlign: "center"}}>
                      <br/>
                      <br/>                      
                      <br/>
                      <br/>
                      <a href="#" onClick={(e: any) => this.changeView(0, e)}>Map</a>
                      <br/>
                      <a href="#" onClick={(e: any) => this.changeView(1, e)}>Sign up</a>
                      <br/>
                    </Grid>
                  </Hidden>
                  <Grid item xs={10} sm={10} md={2} lg={10} style={{textAlign: "left"}}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>
                      Welcome to the Code for Miami Flood Tracker!
                    </p>
                    <br/>
                    <p>
                      The Code For Miami Flood Tracking project has monitoring devices listed below. You can elect to get notified by a phone call, sms message, or both when our trackers detect a flood.
                    </p>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.bottom_navigation_value === 0 ? 
                      <div>
                       <div style={{ height: '60vh', width: '100%' }}>
                        <GoogleMapReact
                          bootstrapURLKeys={{ key: "AIzaSyAnqGvxGX0guwpSNA_SSk4DfIVJ9okqowg" }}
                          defaultCenter={{lat: 25.761681, lng: -80.191788}}
                          defaultZoom={11}
                        >
                        </GoogleMapReact>
                      </div>
                      <br/>
                    </div> : <div>
                        Subscribe
                        <br/>
                        Phone
                        <br/>
                        Device Subscription
                        <br/>
                        Contact Method
                     </div>}
                    <br/>
                    <Hidden smUp>
                    <BottomNavigation
                      value={this.state.bottom_navigation_value}
                      onChange={this.handleBottomNavigationChange}
                      showLabels
                      className={classes.stickToBottom}
                    >
                      <BottomNavigationAction label="Map"/>
                      <BottomNavigationAction label="Signup"/>
                    </BottomNavigation>
                    </Hidden>
                  </Grid>
                   <Hidden mdDown>
                    <Grid item xs={1} sm={1} md={2} lg={2}>
                    </Grid>
                  </Hidden>
              </Grid>
            </div>
          </div>
        </Router>
    );
  }
}

export default withStyles(styles)(FloodTracker);


