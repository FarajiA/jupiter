import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * @description CSS classes for each category of `size`. Custom status panel components should use this object for
 * styling of header, body, and footer panel components
 */
const SIZES = {
  small: {
    head: '',
    body: '',
    foot: ''
  },
  medium: {
    head: '',
    body: 'hxHeading-4',
    foot: ''
  },
  large: {
    head: 'hxHeading-2',
    body: 'hxHeading-3',
    foot: ''
  },
  xlarge: {
    head: 'hxHeading-1',
    body: 'hxHeading-2',
    foot: ''
  }
};

const TYPES = {
  none: '',
  table: 'StatusPanel--table',
  page: 'StatusPanel--page u-flex-grow',
  drawer: 'StatusPanel--drawer'
};

const Panel = ({ size, type, sections, className, children, ...rest }) => (
  <div className={classNames(TYPES[type], className, 'Panel')} {...rest}>
    {sections.head && (
      <div className={classNames(SIZES[size].head, 'Panel-head')}>
        {sections.head}
      </div>
    )}

    <div className={classNames(SIZES[size].body, 'Panel-body')}>
      {sections.body || children}
    </div>

    {sections.foot
      && (
      <footer className={classNames(SIZES[size].foot, 'Panel-foot')}>
        {sections.foot}
      </footer>
      )}
  </div>
);

Panel.propTypes = {
  sectionsBodyOrChildrenRequired: (props) => (
    (!props.children && !('body' in props.sections))
    && new Error('Must have either sections.body or children props defined')
  ),
  size: PropTypes.string,
  type: PropTypes.string,
  sections: PropTypes.shape({
    head: PropTypes.node,
    body: PropTypes.node,
    foot: PropTypes.node
  }),
  className: PropTypes.string,
  children: PropTypes.node
};

Panel.defaultProps = {
  size: 'small',
  type: 'none',
  sections: {}
};

export default Panel;
export { SIZES as SIZECLASSES };
