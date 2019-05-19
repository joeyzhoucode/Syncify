/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../actions/dashboardActions";
import * as playerActions from "../actions/playerActions";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/syncable-react/layouts/dashboardStyle.jsx";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
  </Switch>
);

class Navigator extends React.Component {
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.props.dashboardActions.dashboardDrawerClose();
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.props.dashboard.mobileOpen) {
        this.props.dashboardActions.dashboardDrawerClose();
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {<Sidebar
          routes={routes}
          logoText={"Yi Zhou"}
          logo={this.props.dashboard.image}
          handleDrawerToggle={this.props.dashboardActions.dashboardDrawerToggle}
          handleSearch={this.props.playerActions.playerCommand}
          open={this.props.dashboard.mobileOpen}
          color={this.props.dashboard.color}
          {...rest}
        />}
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.props.dashboardActions.dashboardDrawerToggle}
            handleSearch={this.props.playerActions.playerCommand}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dashboardActions: bindActionCreators(dashboardActions, dispatch),
    playerActions: bindActionCreators(playerActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Navigator));