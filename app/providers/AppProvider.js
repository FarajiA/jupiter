import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { checkUserRoles } from '../actions/authInfo/checkRoles';
import { App } from '../containers/App';

export class AppProvider extends React.Component {
  componentDidMount() {
    this.props.checkRoles();
  }

  render() {
    const { t, roles } = this.props;
    return (
      <App t={t} roles={roles} />
    );
  }
}

AppProvider.propTypes = {
  t: PropTypes.func.isRequired,
  checkRoles: PropTypes.func.isRequired,
  roles: PropTypes.shape({
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    roles: state.roles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkRoles: () => {
      return dispatch(checkUserRoles());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AppProvider)));
