import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Footer from '../components/helix/Footer';
import SignUpSection from './SignUpSection';
import SignupRoutes from '../router/signup';
import Status from '../components/helix/Status';
import { validateUserRoles } from '../actions/authInfo/validateRoles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import UserPermissionAlert from '../components/alert/UserPermissionAlert';

export class App extends React.Component {
  componentDidMount() {
    const { t } = this.props;
    window.document.title = t('common:headers.main.signUp');
    this.props.validateRoles();
  }

  render() {
    const { t, roles } = this.props;
    return (
      <>
        <div id="app" className="u-flex-grow">
          <div id="stage" className="jupiter-content">
            <main role="main" id="content" className="main-body">
              <div className="SignUp-container hxSpan-7-lg hxSpan-9-sm hxSpan-11-xs">
                <Status
                  className="View-status u-space-center"
                  size="xlarge"
                  type="page"
                  loading={roles.pending}
                >
                  <div>
                    <div className="SignUp-header">
                      <h1>{t('common:signUp.headers.main')}</h1>
                      <hr />
                    </div>
                    {
                      !roles.authorized
                        ? <UserPermissionAlert />
                        : (
                          <SignUpSection>
                            <SignupRoutes />
                          </SignUpSection>
                        )
                  }
                  </div>
                </Status>
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  t: PropTypes.func.isRequired,
  validateRoles: PropTypes.func.isRequired,
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
    validateRoles: () => {
      return dispatch(validateUserRoles());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App)));
// export default withTranslation()(App);
