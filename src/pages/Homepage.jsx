import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Landing from "../components/layout/Landing";
import AddProject from "../components/project/AddProject";
import UpdateProject from "../components/project/UpdateProject";
import ProjectBoard from "../components/projectBoard/ProjectBoard"
import AddProjectTask from "../components/projectBoard/projectTask/AddProjectTask";
import UpdateProjectTask from "../components/projectBoard/projectTask/UpdateProjectTask";
import Login from "../components/userManagement/Login";
import Register from "../components/userManagement/Register";
import SecuredRoute from "../securityUtils/SecureRoute";

class Homepage extends Component {
  render() {
    return (
      <div>
        {/* Public Routes */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* Private Routes */}
        <Switch>
          <SecuredRoute exact path="/dashboard" component={Dashboard} />
          <SecuredRoute exact path="/addProject" component={AddProject} />
          <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
          <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />
          <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
          <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
        </Switch>
      </div>
    );
  };
};

export default Homepage;