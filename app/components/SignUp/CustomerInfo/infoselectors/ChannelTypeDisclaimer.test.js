import React from 'react';
import enzyme from 'enzyme';
import { t } from '../../../../../test/i18n/mocks';
import { ChannelTypeDisclaimer } from './ChannelTypeDisclaimer';

describe('ChannelTypeDisclaimer', () => {
  const defaultProps = {
    footer: 'test footer',
    t
  };

  const mount = (props) => {
    return enzyme.mount(<ChannelTypeDisclaimer {...defaultProps} {...props} />);
  };

  test('it renders the footer', () => {
    const wrapperProps = mount();
    expect(wrapperProps.find('Trans').props().defaults).toEqual(defaultProps.footer);
  });
});
