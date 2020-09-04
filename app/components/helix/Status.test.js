import React from 'react';
import * as enzyme from 'enzyme';

import Status, { getStatus } from './Status';
import ErrorPanel from './status/ErrorPanel';
import LoadingPanel from './status/LoadingPanel';
import EmptyPanel from './status/EmptyPanel';

describe('helix/Status', () => {
  let status;
  const defaultProps = { children: <p>a node</p> };
  const shallow = (props) => enzyme.shallow(<Status {...defaultProps} {...props} />);

  describe('none status', () => {
    beforeEach(() => {
      status = shallow();
    });

    it('renders children', () => {
      expect(status.find('p')).toHaveLength(1);
      expect(status.find('p').text()).toEqual('a node');
    });

    it('does not render any status panels', () => {
      expect(status.shallow().find('Panel')).toHaveLength(0);
    });
  });

  [
    { status: 'error', props: { error: new Error() } },
    { status: 'loading', props: { loading: true } },
    { status: 'empty', props: { empty: true } }
  ].forEach((test) => {
    describe(`when status is ${test.status}`, () => {
      it('does not render children', () => {
        status = shallow({ ...test.props });
        expect(status.find('p')).toHaveLength(0);
      });

      it('renders a status panel', () => {
        status = shallow({ ...test.props });
        expect(status.shallow().find('Panel')).toHaveLength(1);
      });

      it('passes default size and type props to status panel', () => {
        const panel = shallow({ ...test.props }).shallow().find('Panel');
        expect(panel.prop('size')).toEqual('small');
        expect(panel.prop('type')).toEqual('none');
      });

      it('passes sections props to status panel', () => {
        const panel = shallow({
          sections: {
            [test.status]: {
              head: <h1>Head</h1>,
              body: <p>Body</p>,
              foot: <button type="submit">foot</button>
            } },
          ...test.props }).shallow().find('Panel');
        expect(panel.prop('sections')).toEqual({
          head: <h1>Head</h1>,
          body: <p>Body</p>,
          foot: <button type="submit">foot</button>
        });
      });

      it('passes className to status panel', () => {
        const panel = shallow({ className: 'Panel', ...test.props }).shallow().find('Panel');
        expect(panel.prop('className')).toEqual('Panel');
      });
    });
  });

  describe('error status', () => {
    it('renders an ErrorPanel', () => {
      status = shallow({
        error: new Error('an error'),
        messages: { error: 'an error message' }
      });
      expect(status.find(ErrorPanel)).toHaveLength(1);
    });

    it('passes `error` to the ErrorPanel', () => {
      status = shallow({
        error: new Error('an error'),
        messages: { error: 'an error message' }
      });
      const panel = status.find(ErrorPanel);
      expect(panel.prop('error')).toBeInstanceOf(Error);
      expect(panel.prop('error').message).toEqual('an error');
    });

    it('passes `messages.error` to the ErrorPanel as `message` prop', () => {
      status = shallow({
        error: new Error('an error'),
        messages: { error: 'an error message' }
      });
      const panel = status.find(ErrorPanel);
      expect(panel.prop('message')).toEqual('an error message');
    });


    [
      { type: 'none' }, { type: 'table' }
    ].forEach((test) => {
      it(`passes type prop of '${test.type}' to status panel`, () => {
        status = shallow({
          error: new Error('an error'),
          type: test.type
        });
        const panel = status.find(ErrorPanel);
        expect(panel.prop('type')).toEqual(test.type);
      });
    });

    [
      { size: 'small' }, { size: 'medium' }, { size: 'large' }
    ].forEach((test) => {
      it(`passes size prop of '${test.size}' to status panel`, () => {
        status = shallow({
          error: new Error('an error'),
          size: test.size
        });
        const panel = status.find(ErrorPanel);
        expect(panel.prop('size')).toEqual(test.size);
      });
    });
  });

  describe('loading status', () => {
    it('renders a LoadingPanel', () => {
      status = shallow({ loading: true });
      expect(status.find(LoadingPanel)).toHaveLength(1);
    });

    [
      { type: 'none' }, { type: 'table' }
    ].forEach((test) => {
      it(`passes type prop of '${test.type}' to status panel`, () => {
        status = shallow({ loading: true, type: test.type });
        const panel = status.find(LoadingPanel);
        expect(panel.prop('type')).toEqual(test.type);
      });
    });

    [
      { size: 'small' }, { size: 'medium' }, { size: 'large' }
    ].forEach((test) => {
      it(`passes size prop of '${test.size}' to status panel`, () => {
        status = shallow({ loading: true, size: test.size });
        const panel = status.find(LoadingPanel);
        expect(panel.prop('size')).toEqual(test.size);
      });
    });
  });

  describe('empty status', () => {
    it('renders an EmptyPanel', () => {
      status = shallow({ empty: true });
      expect(status.find(EmptyPanel)).toHaveLength(1);
    });

    [
      { type: 'none' }, { type: 'table' }
    ].forEach((test) => {
      it(`passes type prop of '${test.type}' to status panel`, () => {
        status = shallow({ empty: true, type: test.type });
        const panel = status.find(EmptyPanel);
        expect(panel.prop('type')).toEqual(test.type);
      });
    });

    [
      { size: 'small' }, { size: 'medium' }, { size: 'large' }
    ].forEach((test) => {
      it(`passes size prop of '${test.size}' to status panel`, () => {
        status = shallow({ empty: true, size: test.size });
        const panel = status.find(EmptyPanel);
        expect(panel.prop('size')).toEqual(test.size);
      });
    });
  });
});

describe('getStatus', () => {
  it('returns ERROR if `error` is an Error', () => {
    expect(getStatus({ error: new Error() })).toEqual('error');
  });

  it('returns ERROR if `message` key found in `error`', () => {
    expect(getStatus({ error: new Error('an error') })).toEqual('error');
    expect(getStatus({ error: { message: 'an error' } })).toEqual('error');
  });

  it('returns LOADING if `loading` is true', () => {
    expect(getStatus({ loading: true })).toEqual('loading');
  });

  it('returns EMPTY if `empty` is true', () => {
    expect(getStatus({ empty: true })).toEqual('empty');
  });

  it('returns NONE if no `error`, `loading`, or `empty` states', () => {
    expect(getStatus()).toEqual('none');
  });
});
