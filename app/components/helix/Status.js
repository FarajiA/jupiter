/* eslint-disable valid-typeof */
import React from 'react';
import PropTypes from 'prop-types';

import { SIZECLASSES } from './status/Panel';
import ErrorPanel from './status/ErrorPanel';
import LoadingPanel from './status/LoadingPanel';
import EmptyPanel from './status/EmptyPanel';

const ERROR = 'error';
const LOADING = 'loading';
const EMPTY = 'empty';
const NONE = 'none';

/**
 * @description Return a string indicating status - error, loading, and empty.
 */
const getStatus = (
  { error = {}, loading = false, empty = false } = {}
) => {
  if (error && ('message' in error || typeof error === Error)) {
    return ERROR;
  } if (loading) {
    return LOADING;
  } if (empty) {
    return EMPTY;
  }
  return NONE;
};

/**
 * @description Displays error, loading, or empty status (in that priority)
 * if they exist, otherwise returns the wrapped component.
 *
 * @prop {String} size size styling (large, medium, small) for the status panel to be returned
 * @prop {String} type type styling (table) for the status panel to be returned
 * @prop {Object} error indicates error status and should be the Error object or object with `message` property
 * @prop {Boolean} loading indicates loading status
 * @prop {Boolean} empty indicates empty status
 * @prop {Object} messages custom messages to be displayed in the error, loading, and empty status panels
 * @prop {Object} sections custom components to be passed as the headers, bodies, and footers of the
 * error, loading, and empty status panels
 * status panels instead of default messages
 * @prop {String} className
 * @prop {ReactElement} children component to be rendered in the case that there is no error, loading, or empty status
*/
const Status = ({
  size, type, error, loading, empty,
  messages, sections, className, children, ...rest
}) => {
  switch (getStatus({ error, loading, empty })) {
    case ('error'):
      return (
        <ErrorPanel
          error={error}
          size={size}
          type={type}
          className={className}
          sections={sections.error}
          message={messages.error}
        />
      );
    case ('loading'):
      return (
        <LoadingPanel
          size={size}
          type={type}
          className={className}
          sections={sections.loading}
          message={messages.loading}
        />
      );
    case ('empty'):
      return (
        <EmptyPanel
          size={size}
          type={type}
          className={className}
          sections={sections.empty}
          message={messages.empty}
        />
      );
    default:
      return children;
  }
};

Status.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool,
  empty: PropTypes.bool,
  messages: PropTypes.shape({
    error: PropTypes.node,
    loading: PropTypes.node,
    empty: PropTypes.node
  }),
  sections: PropTypes.shape({
    error: PropTypes.shape({
      head: PropTypes.node,
      body: PropTypes.node,
      foot: PropTypes.node
    }),
    loading: PropTypes.shape({
      head: PropTypes.node,
      body: PropTypes.node,
      foot: PropTypes.node
    }),
    empty: PropTypes.shape({
      head: PropTypes.node,
      body: PropTypes.node,
      foot: PropTypes.node
    })
  }),
  className: PropTypes.string,
  children: PropTypes.node
};

Status.defaultProps = {
  size: 'small',
  type: 'none',
  error: {},
  loading: false,
  empty: false,
  messages: {},
  sections: {},
  children: null
};

Status.ERROR = ERROR;
Status.LOADING = LOADING;
Status.EMPTY = EMPTY;
Status.NONE = NONE;
Status.SIZECLASSES = SIZECLASSES;

Status.ErrorPanel = ErrorPanel;
Status.LoadingPanel = LoadingPanel;
Status.EmptyPanel = EmptyPanel;

export default Status;
export { getStatus };
