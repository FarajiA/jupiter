import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import { formatRequest } from '../../../../utils/signup';
import { submitUserData } from '../../../actions/signUpUser';
import { resetReduxState } from '../../../actions/resetReduxState';
import SubmissionModal from '../SubmissionModal';
import Button from '../../helix/buttons/Button';
import Submit from '../../helix/buttons/Submit';
import UserInfo from './UserInfo';
import { FormSection, reduxForm } from 'redux-form';
import { asyncValidate, validateUser } from '../../../validators';
import { updateSteps } from '../../../actions/stepsUpdate';

export class UserInfoForm extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.props.updateSteps(2);
  }

  handleSubmit = (values) => {
    const toSubmit = formatRequest(values);
    this.props.signUp(toSubmit);
    this.setState({ open: true });
  };

  closeModal = () => {
    if (this.props.success) {
      this.props.resetReduxState();
    }
    this.props.history.push('/');
  };

  render() {
    const { handleSubmit, history, result, t, pending } = this.props;
    return (
      <div className="Input-section">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h2>{t('account:user.details.header.info')}</h2>
          <FormSection name="userInfo">
            <UserInfo />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-6 align-left">
                <Button
                  classNames="btn-wide"
                  onClick={() => history.push('/billing')}
                  label={t('common:actions.basic.back')}
                />
              </div>
              <div className="hxCol hxSpan-6 align-right">
                <Submit
                  classNames="hxBtn hxPrimary"
                  label={t('common:actions.basic.submit')}
                  disabled={pending}
                  processing={pending}
                />
              </div>
            </div>
          </div>
        </form>
        {result && this.props.updateSteps(3)}
        {result && <SubmissionModal open={this.state.open} hideModal={this.closeModal} />}
      </div>
    );
  }
}

UserInfoForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetReduxState: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
  result: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  updateSteps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    success: state.signUpResponse.success,
    result: !!(!state.signUpResponse.pending && (state.signUpResponse.success || state.signUpResponse.error)),
    pending: state.signUpResponse.pending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (value) => {
      dispatch(submitUserData(value));
    },
    resetReduxState: (value) => {
      dispatch(resetReduxState(value));
    },
    updateSteps: (step) => {
      dispatch(updateSteps(step));
    }
  };
};

export const validate = (values, props) => {
  return {
    ...validateUser(values, props)
  };
};

const UserInfoContainerReduxForm = reduxForm({
  form: 'signUp',
  validate,
  asyncValidate,
  asyncBlurFields: ['userInfo.username', 'userInfo.password'],
  touchOnBlur: false,
  touchOnChange: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(withTranslation()(UserInfoForm));


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoContainerReduxForm));
