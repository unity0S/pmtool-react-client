import React, { Component } from 'react';
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {

  constructor() {
    super()

    this.state = {
      project: {
        id: "",
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: ""
      },
      errors: {},
      afterMountHook: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }
    if (JSON.stringify(prevState.project) !== JSON.stringify(this.state.project)) {
      this.setState({ project: this.state.project });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    // updates state only once after mount
    if (prevState.afterMountHook) {
      const obj = {
        project: {
          id: nextProps.project.project.id,
          projectName: nextProps.project.project.projectName,
          projectIdentifier: nextProps.project.project.projectIdentifier,
          description: nextProps.project.project.description,
          start_date: nextProps.project.project.start_date,
          end_date: nextProps.project.project.end_date
        },
        afterMountHook: false
      };
      return obj;
    }
    //updates state after new input
    if (JSON.stringify(nextProps.project.project) !== JSON.stringify(prevState.project)) {
      const obj = {
        project: {
          id: prevState.project.id,
          projectName: prevState.project.projectName,
          projectIdentifier: prevState.project.projectIdentifier,
          description: prevState.project.description,
          start_date: prevState.project.start_date,
          end_date: prevState.project.end_date,
        }
      };
      return obj;
    }
    return null;
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  };

  onChange(e) {
    e.persist();
    this.setState({ 
      project: {
        ...this.state.project,
        [e.target.name]: e.target.value
      } 
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const updateProject = {
      id: this.state.project.id,
      projectName: this.state.project.projectName,
      projectIdentifier: this.state.project.projectIdentifier,
      description: this.state.project.description,
      start_date: this.state.project.start_date,
      end_date: this.state.project.end_date,
    };

    this.props.createProject(updateProject, this.props.history);
  };


  render() {

    const { errors } = this.state;

    return (
      <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Edit Project form</h5>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                              type="text"
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.projectName
                              })}
                              placeholder="Project Name"
                              name="projectName"
                              value={this.state.project.projectName}
                              onChange={this.onChange}
                            />
                            { errors.projectName &&
                              <div className="div invalid-feedback">
                                {errors.projectName}
                              </div>
                            }
                        </div>
                        <div className="form-group">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Unique Project ID"
                              name="projectIdentifier"
                              value={this.state.project.projectIdentifier}
                              onChange={this.onChange}
                              disabled
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.description
                              })}
                              placeholder="Project Description"
                              name="description"
                              value={this.state.project.description}
                              onChange={this.onChange}
                            />
                            { errors.description &&
                              <div className="div invalid-feedback">
                                {errors.description}
                              </div>
                            }
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input
                              type="date"
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.start_date
                              })}
                              name="start_date"
                              value={this.state.project.start_date}
                              onChange={this.onChange}
                            />
                            { errors.start_date &&
                              <div className="div invalid-feedback">
                                {errors.start_date}
                              </div>
                            }
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input
                              type="date"
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.end_date
                              })}
                              name="end_date"
                              value={this.state.project.end_date}
                              onChange={this.onChange}
                            />
                            { errors.end_date &&
                              <div className="div invalid-feedback">
                                {errors.end_date}
                              </div>
                            }
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

UpdateProject.porpTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProject, createProject }
) (UpdateProject);