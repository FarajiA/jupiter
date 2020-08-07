import React from 'react';
import enzyme from 'enzyme';
import { renderWithForm } from '../../../../test/provider';
import { t } from '../../../../test/i18n/mocks';
import ContractEntitySelectorForm, { ContractEntitySelector } from './ContractEntitySelector';

describe('ContractEntitySelector', () => {
  const defaultProps = {
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<ContractEntitySelector {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(ContractEntitySelectorForm, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('contract entity type values to match Field options', () => {
    const { options } = shallow().find('Field').props();
    const labels = options.map((label) => label.label);
    const values = options.map((value) => value.value);
    expect(labels).toEqual([
      t('account:billing.leagalentity.onica'),
      t('account:billing.leagalentity.rack')
    ]);
    expect(values).toEqual([
      'ONICA_CA',
      'RACK_INTL'
    ]);
  });
});
