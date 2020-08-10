import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { listCountries } from '../../../../actions/address/listCountries';
import { getCountry } from '../../../../actions/address/getCountry';
import DropDown from '../../../helix/inputTypes/Dropdown';

export class CountrySelect extends React.Component {
  componentDidMount() {
    this.props.getCountries();
  }

  onChange = (e) => {
    this.props.prevSelectedCountry === 'CA'
    && e.target.value !== 'CA'
    && this.props.clearContractEntity();
    this.props.clearState();
    this.props.getCountry(e.target.value);
  }

  render() {
    const { countries, t } = this.props;
    const options = _.values(countries).map(({ code, name: countryName }) => {
      return (
        <option key={code} value={code}>
          {countryName}
        </option>
      );
    });
    return (
      <div className="InputField">
        <Field
          name="country"
          component={DropDown}
          valueField="value"
          label={t('account:user.location.country')}
          id="country-select-dropdown"
          onChange={this.onChange}
        >
          {options}
        </Field>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  t: PropTypes.func.isRequired,
  countries: PropTypes.object,
  prevSelectedCountry: PropTypes.string,
  getCountries: PropTypes.func.isRequired,
  getCountry: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  clearContractEntity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    prevSelectedCountry: formValueSelector('signUp')(state, 'billingInfo.address.country'),
    countries: state.countries.countries
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch(listCountries());
    },
    getCountry: (countryCode) => {
      dispatch(getCountry(countryCode));
    },
    clearState: () => {
      dispatch(change('signUp', 'billingInfo.address.state', ''));
    },
    clearContractEntity: () => {
      dispatch(change('signUp', 'billingInfo.contractEntity', ''));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CountrySelect));
