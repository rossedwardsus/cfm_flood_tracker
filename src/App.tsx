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

import { BrowserRouter as Router, Route, Link, match, withRouter, Redirect, Switch } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
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
                    data_as_list_formatted: "", activeTab: 0, anchorEl: null, menuOpen: false};
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
                    <a href="#" onClick={(e: any) => this.changeView("list", e)}>
                      List
                    </a>
                    <br/>
                    <a href="#" onClick={(e: any) => this.changeView("graph", e)}>
                      Graph
                    </a>
                    <br/>
                    {this.state.data_as_list_formatted}
                    <br/>
                    <Hidden smUp>
                    put a bottom navbar here
                    <BottomNavigation
                      value={0}
                      showLabels
                      className={classes.stickToBottom}
                    >
                      <BottomNavigationAction label="List" component={({innerRef, ...props}) => <Link {...props} to="/graph" />}/>
                      <BottomNavigationAction label="Graph" />
                    </BottomNavigation>
                    </Hidden>
                  </Grid>
                  <Hidden mdDown>
                    <Grid item xs>
                      todos not scheduled
                      <br/>
                      most recent notes
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
