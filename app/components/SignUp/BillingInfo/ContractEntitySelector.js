import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropDown from '../../helix/inputTypes/Dropdown';

export class ContractEntitySelector extends React.Component {
  render() {
    const { t } = this.props;
    const options = [
      {
        value: 'ONICA_CA',
        label: t('account:billing.leagalentity.onica'),
        disabled: false
      },
      {
        value: 'RACK_INTL',
        label: t('account:billing.leagalentity.rack'),
        disabled: false
      }
    ];
    return (
      <div className="u-space-top u-space-bottom">
        <Field
          name="contractEntity"
          component={DropDown}
          options={options}
          valueField="value"
          textField="label"
          label={t('account:billing.leagalentity.select')}
          id="contract-entity-select"
        />
      </div>
    );
  }
}

ContractEntitySelector.propTypes = {
  t: PropTypes.func.isRequired
};

export default ContractEntitySelector;
