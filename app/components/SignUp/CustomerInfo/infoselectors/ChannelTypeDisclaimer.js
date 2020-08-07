import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';

export const EmailLink = ({ children }) => (
  <a href="mailto: vmware@rackspace.com" target="_blank" rel="noopener noreferrer">
    {children} <hx-icon type="envelope" />
  </a>
);

export const ChannelTypeDisclaimer = ({ footer }) => {
  return (
    <div className="channelType-disclaimer channelType-fields-spacing">
      <hx-icon type="info-circle" />
      {' '}
      <Trans
        defaults={footer}
        components={[
          <EmailLink />
        ]}
      />
    </div>
  );
};

ChannelTypeDisclaimer.propTypes = {
  footer: PropTypes.string
};

EmailLink.propTypes = {
  children: PropTypes.string
};
