import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Panel from './Panel';

const Empty = ({ message, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Panel {...rest}>
      {message || t('validation:input.empty')}
    </Panel>
  );
};

Empty.propTypes = {
  message: PropTypes.node
};

export default Empty;
