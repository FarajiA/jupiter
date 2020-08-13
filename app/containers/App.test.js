import React from 'react';
import enzyme from 'enzyme';
import { App } from './App';
import { t } from '../../test/i18n/mocks';

describe('App', () => {
  const shallow = (props) => enzyme.shallow(<App t={t} {...props} />);
  test('renders the document title', () => {
    const props = {
      roles: {
        pending: false,
        success: true,
        authorized: true
      }
    };
    expect(document.title).toEqual('');
    shallow(props);
    expect(document.title).toEqual('Rackspace Invoice Sign Up');
  });
  test('renders the loading page', () => {
    const props = {
      roles: {
        pending: true,
        success: false,
        authorized: false
      }
    };
    const wrapper = shallow(props);
    expect(wrapper.find('Status')).toHaveLength(1);
  });
  test('renders the UserPermissionAlert', () => {
    const props = {
      roles: {
        pending: false,
        success: true,
        authorized: false
      }
    };
    const wrapper = shallow(props);
    expect(wrapper.find('UserPermissionAlert')).toHaveLength(1);
  });
  test('renders the SignUpSection', () => {
    const props = {
      roles: {
        pending: false,
        success: true,
        authorized: true
      }
    };
    const wrapper = shallow(props);
    expect(wrapper.find('SignUpSection')).toHaveLength(1);
  });
});
