import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Panel from './Panel';

const Error = ({ error, message, unknownErrorMessage, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Panel {...rest}>
      <hx-error class="ErrorPanel">
        {message || error.message || unknownErrorMessage || t('validation:error.unknown.header')}
      </hx-error>
    </Panel>
  );
};

Error.propTypes = {
  error: PropTypes.object,
  message: PropTypes.node,
  unknownErrorMessage: PropTypes.node
};

Error.defaultProps = {
  error: {}
};

export default Error;
