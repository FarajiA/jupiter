import React from 'react';
import enzyme from 'enzyme';
import { AppContainer } from './AppContainer';
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
  const shallow = (props) => enzyme.shallow(<AppContainer {...defaultProps} {...props} />);
  test('renders the App', () => {
    const wrapper = shallow();
    expect(wrapper.find('App')).toHaveLength(1);
    expect(mockCheckRoles).toHaveBeenCalled();
  });
});
