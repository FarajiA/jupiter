import React from 'react';
import * as enzyme from 'enzyme';

import ErrorPanel from './ErrorPanel';

describe('helix/status/ErrorPanel', () => {
  const defaultProps = { error: new Error('an error message') };
  const shallow = (props) => enzyme.shallow(<ErrorPanel {...defaultProps} {...props} />);

  it('renders an hx-error element', () => {
    expect(shallow().find('hx-error')).toHaveLength(1);
  });

  it('renders displaying `error.message` if it is defined', () => {
    const hxError = shallow({ error: { message: 'an error' } }).find('hx-error');
    expect(hxError).toHaveLength(1);
    expect(hxError.text()).toEqual('an error');
  });

  it('renders displaying `Unknown Error` if `message` not in `error` and `error` is type `Error`', () => {
    const hxError = shallow({ error: new Error() }).find('hx-error');
    expect(hxError.text()).toEqual('Unknown Error');
  });

  it('renders displaying a custom message if defined', () => {
    const hxError = shallow({ message: 'a custom message' }).find('hx-error');
    expect(hxError.text()).toEqual('a custom message');
  });
});
