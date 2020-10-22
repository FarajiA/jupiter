import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  const clickMock = jest.fn();
  const props = {
    label: 'Click Me!',
    variant: 'primary',
    wide: true,
    classNames: 'new-class',
    processing: false,
    onClick: clickMock
  };
  test('it renders correct props', () => {
    const component = renderer.create(<Button {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Label prop is rendered', () => {
    const wrapper = mount(<Button {...props} />);
    expect(wrapper.text()).toEqual('Click Me!');
  });

  test('correct type and classes are rendered if submit', () => {
    const wrapper = shallow(<Button {...props} submit />);
    expect(wrapper.prop('className')).toContain('submit-btn');
    expect(wrapper.prop('type')).toEqual('submit');
  });

  test('busy icon is rendered if processing', () => {
    const icon = mount(<Button {...props} processing />).find('hx-busy');
    expect(icon.length).toBeTruthy();
  });

  test('onClick is invoked upon click', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(clickMock).toHaveBeenCalledTimes(0);
    wrapper.simulate('click');
    expect(clickMock).toHaveBeenCalled();
  });
});
