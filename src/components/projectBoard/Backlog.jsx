import React, { Component } from 'react'
import ProjectTask from './projectTask/ProjectTask';

class Backlog extends Component {
  render() {

    const { project_tasks } = this.props;

    const tasks = project_tasks;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {tasks.map(task => {
              if(task.status === "TO_DO") return <ProjectTask project_task={task} key={task.id} />
              return null;
            })}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {tasks.map(task => {
              if(task.status === "IN_PROGRESS") return <ProjectTask project_task={task} key={task.id} />
              return null;
            })}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {tasks.map(task => {
              if(task.status === "DONE") return <ProjectTask project_task={task} key={task.id} />
              return null;
            })}
          </div>
        </div>
      </div>
    )
  };
};

export default Backlog;
