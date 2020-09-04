import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Panel from './Panel';

const Loading = ({ message, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Panel {...rest}>
      {message || t('common:notifications.loading')}<hx-busy class="LoadingPanel-busy" />
    </Panel>
  );
};

Loading.propTypes = {
  message: PropTypes.node
};

export default Loading;
