import React from 'react';
import enzyme from 'enzyme';
import { renderWithForm } from '../../../../../test/provider';
import { t } from '../../../../../test/i18n/mocks';
import ChannelType from './ChannelType';

describe('Product', () => {
  const mockHandleChannelUpdate = jest.fn();
  const defaultProps = {
    handleChannelUpdate: mockHandleChannelUpdate,
    channelType: 'AWS',
    t
  };

  const shallow = (props) => {
    return enzyme.shallow(<ChannelType {...defaultProps} {...props} />);
  };

  test('it renders', () => {
    const rendered = renderWithForm(ChannelType, { defaultProps }).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  test('it should render a redux form field', () => {
    const wrapperProps = shallow().find('Field');
    expect(wrapperProps).toHaveLength(1);
    expect(wrapperProps.props().required).toBeTruthy();
    expect(wrapperProps.props().disclaimer).toBeInstanceOf(Object);
  });
});
