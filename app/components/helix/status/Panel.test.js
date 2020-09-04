import React from 'react';
import * as enzyme from 'enzyme';

import Panel from './Panel';

describe('helix/status/Panel', () => {
  const defaultProps = { children: <h1>Status Message</h1> };
  const shallow = (props) => enzyme.shallow(<Panel {...defaultProps} {...props} />);

  it('renders panel', () => {
    expect(shallow().find('.Panel')).toHaveLength(1);
  });

  it('renders panel body', () => {
    const panelBody = shallow().find('.Panel-body').shallow();
    expect(panelBody).toHaveLength(1);
    expect(panelBody.find('h1').html()).toEqual(
      '<h1>Status Message</h1>'
    );
  });

  it('renders panel body when defined with sections.body', () => {
    const panelBody = shallow({ sections: { body: <h1>Different Status Message</h1> } }).find('.Panel-body').shallow();
    expect(panelBody).toHaveLength(1);
    expect(panelBody.find('h1').html()).toEqual(
      '<h1>Different Status Message</h1>'
    );
  });

  it('renders panel head when defined', () => {
    const panel = shallow({ sections: { head: <h2>Status Head</h2> } });
    const panelHead = panel.find('.Panel-head');
    expect(panelHead).toHaveLength(1);
    expect(panelHead.find('h2').html()).toEqual(
      '<h2>Status Head</h2>'
    );
  });

  it('renders panel foot when defined', () => {
    const panel = shallow({ sections: { foot: <p>Status Foot</p> } });
    const panelFoot = panel.find('footer');
    expect(panelFoot).toHaveLength(1);
    expect(panelFoot.find('p').html()).toEqual(
      '<p>Status Foot</p>'
    );
  });

  [
    { size: 'small', head: '', body: '', foot: '' },
    { size: 'medium', head: '', body: 'hxHeading-4', foot: '' },
    { size: 'large', head: 'hxHeading-2', body: 'hxHeading-3', foot: '' },
    { size: 'xlarge', head: 'hxHeading-1', body: 'hxHeading-2', foot: '' }
  ].forEach((test) => {
    describe(`when size is ${test.size}`, () => {
      it('renders with the appropriate CSS classes for header, body, and foot', () => {
        const panel = shallow({
          sections: {
            head: <h2>Status Head</h2>,
            foot: <p>Status Foot</p>
          },
          size: test.size
        });
        const headerClass = test.head ? `${test.head} Panel-head` : 'Panel-head';
        const bodyClass = test.body ? `${test.body} Panel-body` : 'Panel-body';
        const footerClass = test.foot ? `${test.foot} Panel-foot` : 'Panel-foot';
        const panelHead = panel.find('.Panel-head');
        const panelBody = panel.find('.Panel-body');
        const panelFoot = panel.find('.Panel-foot');
        expect(panelHead.prop('className')).toEqual(headerClass);
        expect(panelBody.prop('className')).toEqual(bodyClass);
        expect(panelFoot.prop('className')).toEqual(footerClass);
      });
    });
  });

  [
    { type: 'none', panel: '', head: '', body: '', foot: '' },
    { type: 'table', panel: 'StatusPanel--table', head: '', body: '', foot: '' },
    { type: 'page', panel: 'StatusPanel--page', head: '', body: '', foot: '' }
  ].forEach((test) => {
    describe(`when type is ${test.type}`, () => {
      it('renders with the appropriate CSS classes for panel, header, body, and foot', () => {
        const cmp = shallow({
          sections: {
            head: <h2>Status Head</h2>,
            foot: <p>Status Foot</p>
          },
          type: test.type
        });
        const headerClass = test.head ? `${test.head} Panel-head` : 'Panel-head';
        const bodyClass = test.body ? `${test.body} Panel-body` : 'Panel-body';
        const footerClass = test.foot ? `${test.foot} Panel-foot` : 'Panel-foot';
        const panelHead = cmp.find('.Panel-head');
        const panelBody = cmp.find('.Panel-body');
        const panelFoot = cmp.find('.Panel-foot');
        expect(panelHead.prop('className')).toEqual(headerClass);
        expect(panelBody.prop('className')).toEqual(bodyClass);
        expect(panelFoot.prop('className')).toEqual(footerClass);
      });

      it('renders with custom classes and type class on panel', () => {
        const panel = shallow({
          className: 'Panel',
          type: test.type
        }).find('.Panel');
        expect(panel.prop('className')).toContain('Panel');
        expect(panel.prop('className')).toContain(test.panel);
      });
    });
  });
});
