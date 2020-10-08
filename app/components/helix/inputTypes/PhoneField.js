import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Error from '../Error';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class PhoneField extends React.Component {
  onChange = (inputValue, countryData, event, formattedNumber) => {
    this.props.input.onChange(this.formatValue(countryData, formattedNumber));
  };

  onBlur = (event, countryData) => {
    this.props.input.onBlur(this.formatValue(countryData, event.target.value));
  };

  /** Format large data-set coming from component into a smaller data-set we can send back to redux-form */
  formatValue = (countryData, formattedValue) => {
    return {
      inputValue: formattedValue.split(' ').slice(1).join(''),
      number: formattedValue.replace(/[- .()]?/g, ''),
      formattedValue,
      valid: formattedValue && countryData?.format ? countryData?.format?.length === formattedValue.length : false,
      countryCode: countryData?.dialCode?.toUpperCase() ?? ''
    };
  };

  render() {
    const { name, label, meta, t, country } = this.props;
    const errorBorder = (meta.touched && meta.invalid) && 'error-border';
    return (
      <div className="InputField">
        <label htmlFor={name}>
          <span className="InputField-label">{label}</span>
        </label>
        <PhoneInput
          inputClass={classnames(errorBorder, 'hxTextCtrl')}
          country={country ? country.toLowerCase() : 'us'} // default country
          onBlur={this.onBlur}
          onChange={this.onChange}
          buttonClass={errorBorder}
          searchPlaceholder={t('common:actions.basic.search')}
          searchNotFound={t('common:search.status.notFound')}
          enableSearch
          enableLongNumbers
          disableSearchIcon
          inputProps={{
            name,
            required: true,
            autoFocus: false
          }}
        />
        <Error meta={meta} />
      </div>
    );
  }
}

PhoneField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  country: PropTypes.string,
  t: PropTypes.func.isRequired
};

export default PhoneField;
