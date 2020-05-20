import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { clearResult, submitUserData } from '../../actions/signUpUser';
import _ from 'lodash';
import { CUSTOMER_SIGNUP_REQUEST } from '../../signupReqFormat/customer';
import { RBU_SIGNUP_REQUEST } from '../../signupReqFormat/rbuCustomer';
import Submit from '../../components/helix/buttons/Submit';
import SubmissionModal from '../../components/SignUp/SubmissionModal';
import SignupRoutes from '../../router/signup';
import { validateUser } from '../../validators';
import { Context } from '../Context';

export class SignUpForm extends React.Component {
  formatRequest = (values) => {
    const template = (
      _.get(values, ['userInfo', 'customerType', 'isRbu'])
        ? RBU_SIGNUP_REQUEST
        : CUSTOMER_SIGNUP_REQUEST
    );
    return {
      ...template,
      accountName: values.accountName,
      externalId: (values.productType).toUpperCase(),
      serviceLevel: 'MANAGED',
      contacts: {
        contact: [
          {
            firstName: values.firstName,
            lastName: values.lastName,
            title: values.title,
            addresses: {
              address: [
                {
                  ...values.address,
                  primary: true
                }
              ]
            },
            emailAddresses: {
              emailAddress: [
                {
                  address: values.email,
                  primary: true
                }
              ]
            },
            phoneNumbers: {
              phoneNumber: [
                {
                  country: values.address.country,
                  number: values.phoneNumber.number,
                  category: 'HOME',
                  primary: true
                }
              ]
            },
            user: {
              username: values.username,
              password: values.password
            },
            roles: template.contacts.contact[0].roles
          }
        ]
      }
    };
  };

  handleSubmit = (values) => {
    const toSubmit = this.formatRequest(values);
    this.props.signUp(toSubmit);
  };

  closeModal = () => {
    this.props.clearResult();
  };

  render() {
    const { t, handleSubmit, result, pending } = this.props;
    return (
      <div className="SignUp-form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="InputField-content">
            <SignupRoutes />
          </div>
          <div className="SignUp-buttons">
            <Submit
              label={t('common:actions.basic.submit')}
              disabled={pending}
              processing={pending}
            />
          </div>
        </form>
        <SubmissionModal openModal={result} hideModal={this.closeModal} />
      </div>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  clearResult: PropTypes.func.isRequired,
  result: PropTypes.bool.isRequired
};

SignUpForm.contextType = Context;

export const validateForm = (values, props) => {
  return {
    ...validateUser(values, props)
  };
};

const mapStateToProps = (state) => {
  return {
    pending: state.signUpResponse.pending,
    result: !!(!state.signUpResponse.pending && (state.signUpResponse.success || state.signUpResponse.error))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (value) => {
      dispatch(submitUserData(value));
    },
    clearResult: (value) => {
      dispatch(clearResult(value));
    }
  };
};

const SignUpReduxForm = reduxForm({
  form: 'signUp',
  enableReinitialize: true,
  validate: validateForm
})(withTranslation()(SignUpForm));

export default connect(mapStateToProps, mapDispatchToProps)(SignUpReduxForm);
