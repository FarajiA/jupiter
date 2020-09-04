import React from 'react';
import * as enzyme from 'enzyme';

import EmptyPanel from './EmptyPanel';

describe('helix/status/EmptyPanel', () => {
  const shallow = (props) => enzyme.shallow(<EmptyPanel {...props} />);

  it('renders panel body displaying default empty message and indicator', () => {
    const emptyPanel = shallow();
    expect(emptyPanel.find('Panel')).toHaveLength(1);
    const panelBody = emptyPanel.shallow().find('.Panel-body');
    expect(panelBody).toHaveLength(1);
    expect(panelBody.childAt(0).text()).toEqual('Empty');
  });

  it('renders displaying a custom message if defined', () => {
    const panelBody = shallow({ message: 'a custom empty message' }).shallow().find('.Panel-body');
    expect(panelBody).toHaveLength(1);
    expect(panelBody.childAt(0).text()).toEqual('a custom empty message');
  });
});
