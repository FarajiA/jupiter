import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector, reduxForm, FormSection, change } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { validateBilling } from '../../../validators';
import AddressSection from './AddressSection';
import CurrencySelector from './CurrencySelector';
import Button from '../../helix/buttons/Button';
import Submit from '../../helix/buttons/Submit';
import { ADDRESS_FIELDS } from '../../../actions/constants/address';
import { getCountry } from '../../../actions/getCountry';

export class BillingInfoForm extends React.Component {
  componentDidMount() {
    const { customerType, clearProduct } = this.props;
    if (customerType === 'rbu') {
      this.populateAddressFields();
      this.props.getCountry('JP'); // used when RBU address pre-populates
      clearProduct();
    } else {
      this.clearAddressFields();
    }
  }

  populateAddressFields = () => {
    Object.entries(ADDRESS_FIELDS).forEach((entry) => {
      this.props.setAddress(...entry);
    });
  };

  clearAddressFields = () => {
    Object.keys(ADDRESS_FIELDS).forEach((field) => {
      this.props.setAddress(field, '');
    });
  };

  onSubmit = () => {
    this.props.history.push('/user-detail');
  };

  render() {
    const { t, handleSubmit, history, customerType, country } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="Input-section u-form">
          <h2>{t('account:billing.header.info')}</h2>
          <FormSection name="billingInfo">
            <AddressSection
              customerType={customerType}
              t={t}
            />
            <CurrencySelector
              customerType={customerType}
              country={country}
              t={t}
            />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-6">
                <Button
                  classNames="btn-wide"
                  label={t('common:actions.basic.back')}
                  onClick={() => history.push('/')}
                />
              </div>
              <div className="hxCol hxSpan-6 align-right">
                <Submit
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

BillingInfoForm.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  customerType: PropTypes.string,
  setAddress: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
  getCountry: PropTypes.func.isRequired,
  country: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    country: formValueSelector('signUp')(state, 'billingInfo.address.country'),
    countryData: state.country.details,
    initialValues: {
      // Creates a form field we use to validate states existence in a country
      countryData: state.country.details,
      billingInfo: {
        address: {
          // enableReinitialize will reset the form's country to null after it is selected
          // Used redefine based on redux
          country: state.country.details.code
        }
      }
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => {
      dispatch(change('signUp', 'customerInfo.productType', ''));
    },
    setAddress: (field, value) => {
      dispatch(change('signUp', `billingInfo.address.${field}`, value));
    },
    getCountry: (countryCode) => {
      dispatch(getCountry(countryCode));
    }
  };
};

const validate = (values, props) => {
  return {
    ...validateBilling(values, props)
  };
};

const BillingReduxForm = reduxForm({
  form: 'signUp',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(BillingInfoForm));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingReduxForm));
