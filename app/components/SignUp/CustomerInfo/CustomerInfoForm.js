import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, FormSection, formValueSelector, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import Submit from '../../helix/buttons/Submit';
import { validateCustomerInformation } from '../../../validators';
import CustomerType from './CustomerType';
import Product from './Product';
import { ADDRESS_FIELDS } from '../../../actions/constants/address';
import { getCountry } from '../../../actions/getCountry';

export class CustomerInfoForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.customerType === 'rbu' && prevProps.customerType !== this.props.customerType) {
      this.clearAddressFields();
    }
  }

  handleChange = (e) => {
    if (e.target.value === 'rbu') {
      this.populateAddressFields();
      this.props.getCountry('JP'); // used when RBU address pre-populates
    }
    this.props.clearProduct();
  };

  onSubmit = () => {
    this.props.history.push('/billing');
  };

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

  render() {
    const { t, handleSubmit, customerType } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="Input-section u-form">
          <h2>{t('account:customer.header.info')}</h2>
          <FormSection name="customerInfo">
            <CustomerType handleChange={this.handleChange} />
            <Product customerType={customerType} />
          </FormSection>
          <div className="NavButtons">
            <div className="hxRow">
              <div className="hxCol hxSpan-12 align-right">
                <Submit
                  classNames="btn-wide hxBtn hxPrimary"
                  label={t('common:actions.basic.next')}
                  submit
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

CustomerInfoForm.propTypes = {
  t: PropTypes.func.isRequired,
  customerType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  getCountry: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    customerType: formValueSelector('signUp')(state, 'customerInfo.customerType'),
    productType: formValueSelector('signUp')(state, 'customerInfo.productType'),
    initialValues: {
      billingInfo: {
        address: {
          street: '',
          city: '',
          zipcode: '',
          country: '',
          state: ''
        }
      }
    }
  };
};

const validate = (values, props) => {
  return validateCustomerInformation(values, props);
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (field, value) => {
      dispatch(change('signUp', `billingInfo.address.${field}`, value));
    },
    clearProduct: () => {
      dispatch(change('signUp', 'customerInfo.productType', ''));
    },
    getCountry: (countryCode) => {
      dispatch(getCountry(countryCode));
    }
  };
};

const CustomerInformationReduxForm = reduxForm({
  form: 'signUp',
  validate,
  touchOnChange: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(withTranslation()(CustomerInfoForm));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerInformationReduxForm));
