import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import DropDown from '../../helix/inputTypes/Dropdown';

export const CustomerType = ({ handleCustomerTypeChange }) => {
  const { t } = useTranslation();
  const customerTypes = [
    {
      label: t('account:customer.type.rackspace'),
      value: 'rackspace'
    },
    {
      label: t('account:customer.type.rbu'),
      value: 'rbu'
    },
    {
      label: t('account:customer.type.onica'),
      value: 'onica'
    }
  ];
  return (
    <div className="CustomerType-section">
      <div className="hxRow">
        <div className="hxCol hxSpan-12">
          <Field
            name="customerType"
            component={DropDown}
            options={customerTypes}
            valueField="value"
            textField="label"
            label={t('account:customer.actions.select')}
            id="customer-select-popover"
            onChange={handleCustomerTypeChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

CustomerType.propTypes = {
  handleCustomerTypeChange: PropTypes.func
};

export default CustomerType;
