import React from 'react';
import enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import UserPermissionAlert from './UserPermissionAlert';

describe('UserPermissionAlert', () => {
  global.window.open = jest.fn();
  const shallow = (props) => enzyme.shallow(<UserPermissionAlert {...props} />);
  test('UserPermissionAlert', () => {
    const component = renderer.create(<UserPermissionAlert />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('it invokes window.open()', () => {
    const wrapper = shallow();
    wrapper.find('Alert').props().onSubmit();
    expect(global.window.open).toHaveBeenCalled();
  });
});
