import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { updateProjectTask, getProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {

  constructor(props) {
    super(props)
    const { backlog_id, pt_id } = this.props.match.params;

    this.state = {
      project_task: {
        id: "",
        projectSequence: pt_id,
        summary: "",
        acceptanceCriteria: "",
        status: "",
        priority: 0,
        dueDate: "",
        projectIdentifier: backlog_id
      },
      errors: {},
      afterMountHook: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({erros: this.state.erros});
    }
    if(JSON.stringify(prevState.project_task) !== JSON.stringify(this.state.project_task)) {
      this.setState({ project_task: this.state.project_task });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (prevState.afterMountHook) {
      const obj = {
        project_task: {
          id: nextProps.project_task.id,
          projectSequence: nextProps.project_task.projectSequence,
          summary: nextProps.project_task.summary,
          acceptanceCriteria: nextProps.project_task.acceptanceCriteria,
          status: nextProps.project_task.status,
          priority: nextProps.project_task.priority,
          dueDate: nextProps.project_task.dueDate,
          projectIdentifier: nextProps.project_task.projectIdentifier,
        },
        afterMountHook: false
      };
      return obj;
    }

    if(JSON.stringify(nextProps.project_task.project_task) !== JSON.stringify(prevState.project_task)) {
      const obj = {
        project_task: {
          id: prevState.project_task.id,
          projectSequence: prevState.project_task.projectSequence,
          summary: prevState.project_task.summary,
          acceptanceCriteria: prevState.project_task.acceptanceCriteria,
          status: prevState.project_task.status,
          priority: prevState.project_task.priority,
          dueDate: prevState.project_task.dueDate,
          projectIdentifier: prevState.project_task.projectIdentifier,
        }
      };
      return obj;
    }
    return null;
  }

  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }

  onChange(e) {
    e.persist();
    this.setState({
      project_task: {
        ...this.state.project_task,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const updateProjectTask = {
      id: this.state.project_task.id,
      projectSequence: this.state.project_task.projectSequence,
      summary: this.state.project_task.summary,
      acceptanceCriteria: this.state.project_task.acceptanceCriteria,
      status: this.state.project_task.status,
      priority: this.state.project_task.priority,
      dueDate: this.state.project_task.dueDate,
      projectIdentifier: this.state.project_task.projectIdentifier
    };
    
    this.props.updateProjectTask(
      updateProjectTask.projectIdentifier,
      updateProjectTask.projectSequence,
      updateProjectTask,
      this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${this.state.project_task.projectIdentifier}`} className="btn btn-light">
                  Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
                <p className="lead text-center">Project Name: {this.state.project_task.projectIdentifier}
                  {" ------ "}Project Task ID: {this.state.project_task.projectSequence}
                </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.project_task.summary}
                    onChange={this.onChange}
                  />
                  {/* {console.log(this.state)} */}
                  { errors.summary && (
                    <div className="invalid-feedback">
                      { errors.summary }
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.project_task.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.project_task.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.project_task.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.project_task.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  };
};

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project_task: state.backlog.project_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProjectTask, updateProjectTask }
) (UpdateProjectTask);