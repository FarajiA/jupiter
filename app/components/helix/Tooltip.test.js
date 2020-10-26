import React from 'react';
import renderer from 'react-test-renderer';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  const props = {
    id: 'testing',
    children: '<h1>Tooltip Content</h1>'
  };

  test('it renders correct props', () => {
    const component = renderer.create(<Tooltip {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it renders the children', () => {
    const wrapper = mount(<Tooltip {...props} />).find('hx-tooltip');
    expect(wrapper.text()).toEqual('<h1>Tooltip Content</h1>');
  });
});
