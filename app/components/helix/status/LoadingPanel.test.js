import React from 'react';
import * as enzyme from 'enzyme';

import LoadingPanel from './LoadingPanel';

describe('helix/status/LoadingPanel', () => {
  const shallow = (props) => enzyme.shallow(<LoadingPanel {...props} />);

  it('renders displaying default loading message, indicator, and CSS class', () => {
    const loadingPanel = shallow().find('Panel');
    expect(loadingPanel.find('Panel')).toHaveLength(1);
    expect(loadingPanel.find('Panel').shallow().find('hx-busy').prop('class')).toEqual('LoadingPanel-busy');
    const panelBody = loadingPanel.shallow().find('.Panel-body');
    expect(panelBody).toHaveLength(1);
    expect(panelBody.childAt(0).text()).toContain('Loading');
    expect(panelBody.find('hx-busy')).toHaveLength(1);
  });

  it('renders displaying a custom message if defined', () => {
    const panelBody = shallow({ message: 'a custom loading message' }).shallow().find('.Panel-body');
    expect(panelBody).toHaveLength(1);
    expect(panelBody.childAt(0).text()).toEqual('a custom loading message');
  });
});
