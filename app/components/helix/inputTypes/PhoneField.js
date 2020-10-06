import React from 'react';
import PropTypes from 'prop-types';
import { get, toUpper } from 'lodash';
import Error from '../Error';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class PhoneField extends React.Component {
  onChange = (inputValue, countryData, event, formattedNumber) => {
    this.props.input.onChange(this.formatValue(countryData, formattedNumber));
  };

  // onBlur only returns the event and countryData
  onBlur = (event, countryData) => {
    this.props.input.onBlur(this.formatValue(countryData, event.target.value));
  };

  /** Format large data-set coming from component into a smaller data-set we can send back to redux-form */
  formatValue = (countryData, formattedValue) => {
    const format = get(countryData, 'format');
    return {
      number: formattedValue.replace(/[- .()]?/g, ''),
      formattedValue,
      valid: formattedValue && format ? get(countryData, 'format').length === formattedValue.length : false,
      countryCode: toUpper(get(countryData, 'dialCode'))
    };
  };

  render() {
    const { name, label, meta, t } = this.props;
    return (
      <div className="InputField">
        <label htmlFor={name}>
          <span className="InputField-label">{label}</span>
        </label>
        <PhoneInput
          inputClass="hxTextCtrl"
          country="us" // default country
          onBlur={(event, value, other) => this.onBlur(event, value, other)}
          onChange={this.onChange}
          searchPlaceholder={t('common:actions.basic.search')}
          searchNotFound={t('common:search.status.notFound')}
          enableSearch
          disableSearchIcon
          inputProps={{
            name,
            required: true,
            autoFocus: true
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
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default PhoneField;
