import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import DropDown from '../../helix/inputTypes/Dropdown';
import Tooltip from '../../helix/Tooltip';

export const Product = ({ customerType, clearChannelType }) => {
  const { t } = useTranslation();
  const dropdownData = [
    {
      label: t('account:product.type.aws'),
      value: 'aws',
      disabled: false // value is not affected by customerType
    },
    {
      label: t('account:product.type.managed_gcp'),
      value: 'managed_gcp',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('account:product.type.azure'),
      value: 'azure',
      disabled: customerType === 'rbu' || customerType === 'onica'

    },
    {
      label: t('account:product.type.managed_vmc'),
      value: 'managed_vmc',
      disabled: customerType === 'rbu' || customerType === 'onica'
    },
    {
      label: t('account:product.type.rpc_v'),
      value: 'rpc_v',
      disabled: customerType === 'onica'
    }
  ];
  const tooltip = (
    <Tooltip id="product-restriction">{t('account:customer.tips.rbu.productRestriction')}</Tooltip>
  );
  return (
    <Field
      name="productType"
      component={DropDown}
      options={dropdownData}
      label={t('account:product.actions.select')}
      valueField="value"
      textField="label"
      id="product-select-popover"
      disabled={!customerType}
      tooltip={tooltip}
      required
      onChange={clearChannelType}
    />
  );
};

Product.propTypes = {
  customerType: PropTypes.string,
  clearChannelType: PropTypes.func
};

export default Product;
