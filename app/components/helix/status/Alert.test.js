import React from 'react';
import * as enzyme from 'enzyme';

import Alert from './Alert';

describe('helix/Alert', () => {
  const shallow = (props, children = (<p>a node</p>)) => (
    enzyme.shallow(<Alert {...props}>{children}</Alert>).find('hx-alert')
  );

  const mount = (props, children = (<p>a node</p>)) => enzyme.mount(<Alert {...props}>{children}</Alert>);

  it('renders children', () => {
    const alert = shallow({ type: 'default' }, 'test');
    expect(alert.text()).toEqual(' test');
    expect(enzyme.shallow(<Alert><p>a node</p></Alert>).find('hx-alert').text()).toEqual(' a node');
  });

  it('renders content as children', () => {
    const alert = shallow({ content: 'test' });
    expect(alert.text()).toEqual(' test');
  });

  it('passes className as class prop to hx-alert', () => {
    const alert = shallow({ className: 'alert' });
    expect(alert.prop('class')).toEqual('alert');
  });

  describe('Alert type', () => {
    it('renders type', () => {
      ['info', 'success', 'warning', 'default', 'error'].forEach((type) => {
        const alert = shallow({ type }, 'Child data');
        type === 'default' ? expect(alert.prop('type')).toEqual('') : expect(alert.prop('type')).toEqual(type);
      });
    });
  });

  describe('Alert type with static prop', () => {
    it('renders type as static', () => {
      ['info', 'success', 'warning', 'default', 'error'].forEach((type) => {
        const alert = shallow({ type, 'static': true }, 'test');
        expect(alert.prop('static')).toEqual(true);
      });
    });
  });

  it('componentDidMount adds event listeners', () => {
    const props = {
      onSubmit: jest.fn(),
      onDismiss: jest.fn()
    };
    const instance = mount(props).instance();
    instance.hxRef.addEventListener = jest.fn();
    instance.componentDidMount();
    expect(instance.hxRef.addEventListener).toHaveBeenCalledWith('submit', props.onSubmit);
    expect(instance.hxRef.addEventListener).toHaveBeenCalledWith('dismiss', props.onDismiss);
  });

  it('componentWillUnmount removes all event listeners', () => {
    const props = {
      onSubmit: jest.fn(),
      onDismiss: jest.fn()
    };
    const instance = mount(props).instance();
    instance.hxRef.removeEventListener = jest.fn();
    instance.componentWillUnmount();
    expect(instance.hxRef.removeEventListener).toHaveBeenCalledWith('submit', props.onSubmit);
    expect(instance.hxRef.removeEventListener).toHaveBeenCalledWith('dismiss', props.onDismiss);
  });
});
