import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Backlog from './Backlog';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';

class ProjectBoard extends Component {

  constructor() {
    super();

    this.state= {
      errors: {}
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({erros: this.state.erros});
    }
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  render() {

    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        { project_tasks.length < 1 && errors.projectNotFound && (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          )
        }
        { project_tasks.length < 1 && errors.projectIdentifier && (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          )
        }
        { project_tasks.length < 1 && errors && (!errors.projectNotFound && !errors.projectIdentifier) && (
            <div className="alert alert-danger text-center" role="alert">
              No Project Tasks on this board
            </div>
          )
        }
        { project_tasks.length > 0 && (
            <Backlog project_tasks={project_tasks} />
          )
        }
      </div>
    )
  };
};

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
) (ProjectBoard);