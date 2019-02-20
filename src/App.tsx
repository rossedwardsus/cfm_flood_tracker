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
    maxWidth: 720,
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
                    data_as_list_formatted: "", activeTab: 0, anchorEl: null, menuOpen: false, date_formatted: "", view_type: "list", current_date: ""};
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
    
    this.setState({view_type: type});
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
              <Grid container spacing={24} style={{textAlign: "left"}}>
                  <Hidden mdDown>
                    <Grid item xs={12} sm={1} md={2} lg={4} style={{textAlign: "left"}}>
                      <br/>
                      <br/>
                      hide this on mobile
                      
                      <br/>
                      <br/>
                      Data
                      <br/>
                      <a href="#" onClick={(e: any) => this.changeView("list", e)}>List</a>
                      <br/>
                      <a href="#" onClick={(e: any) => this.changeView("graph", e)}>Graph</a>
                      <br/>
                    </Grid>
                  </Hidden>
                  <Grid item xs>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>
                      Welcome to the Code for Miami Flood Tracker!
                    </p>
                    <br/>
                    <a href="#" onClick={(e: any) => this.decrementDate(e)}>Previous Day</a>{this.state.date_formatted}<a href="#" onClick={(e: any) => this.incrementDate(e)}>Next Day</a>
                    <br/>
                    <br/>
                    
                    <br/>
                    {this.state.view_type == "list" ? 
                      <div>
                       <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Event</TableCell>
                            <TableCell align="right">Data</TableCell>
                            <TableCell align="right">Coreid</TableCell>
                            <TableCell align="right">published_at</TableCell>
                          </TableRow>
                        </TableHead>
                     
                       <TableBody>
                        {this.state.data.map((row: any) => (
                          <TableRow key={1}>
                            <TableCell component="th" scope="row">
                              {row.event}
                            </TableCell>
                            <TableCell align="right">{row.data}</TableCell>
                            <TableCell align="right">{row.coreid}</TableCell>
                            <TableCell align="right">{this.formatPublishedAt(row.published_at)}</TableCell>
                          </TableRow>
                        ))}
                        </TableBody>
                      </Table>
                      <br/>
                    </div> : <div>graph</div>}
                    <br/>
                    <Hidden smDown>
                    put a bottom navbar here
                    <BottomNavigation
                      value={0}
                      showLabels
                      className={classes.stickToBottom}
                    >
                      <BottomNavigationAction label="List" component={({innerRef, ...props}) => <Link {...props} to="/graph" />}/>
                      <BottomNavigationAction label="Graph" onClick={(e: any) => this.changeView("graph", e)}/>
                    </BottomNavigation>
                    </Hidden>
                  </Grid>
              </Grid>
            </div>
          </div>
        </Router>
    );
  }
}

export default withStyles(styles)(FloodTracker);
