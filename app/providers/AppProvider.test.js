import React from 'react';
import enzyme from 'enzyme';
import { AppProvider } from './AppProvider';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  const mockCheckRoles = jest.fn();
  const defaultProps = {
    t,
    checkRoles: mockCheckRoles,
    roles: {
      pending: false,
      success: true,
      authorized: true
    }
  };
  const shallow = (props) => enzyme.shallow(<AppProvider {...defaultProps} {...props} />);
  test('renders the App', () => {
    const wrapper = shallow();
    expect(wrapper.find('App')).toHaveLength(1);
    expect(mockCheckRoles).toHaveBeenCalled();
  });
});
