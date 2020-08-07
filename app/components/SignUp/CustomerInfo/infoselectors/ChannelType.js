import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { useTranslation } from 'react-i18next';
import InputTiles from '../../../helix/inputTypes/InputTiles';
import { ChannelTypeDisclaimer } from './ChannelTypeDisclaimer';

export const ChannelType = ({ handleChannelUpdate, channelType = '' }) => {
  const { t } = useTranslation();
  const email = 'vmware@rackspace.com';

  const channelTypes = [
    {
      label: t('account:channel.type.insight'),
      subheader: t('account:channel.type.subheader.insight'),
      description: t('account:customer.desc.vmc.channeltype.standard'),
      value: 'Insight'
    },
    {
      label: t('account:channel.type.carahsoft'),
      subheader: t('account:channel.type.subheader.carahsoft'),
      description: t('account:customer.desc.vmc.channeltype.publicsector'),
      value: 'Carahsoft'
    },
    {
      label: t('account:channel.type.aws'),
      subheader: '',
      description: t('account:customer.desc.vmc.channeltype.aws'),
      value: 'AWS'
    }
  ];

  return (
    <div className="hxRow channelType-section">
      <Field
        name="channelType"
        component={InputTiles}
        options={channelTypes}
        label={t('account:customer.channel.select')}
        id="vmc-channeltype-select"
        size="medium"
        required
        selectedValue={channelType}
        handleChannelUpdate={handleChannelUpdate}
        disclaimer={<ChannelTypeDisclaimer footer={`${t('account:customer.tips.vmc.channeltype.alert', { email })}`} />}
      />
    </div>
  );
};

ChannelType.propTypes = {
  handleChannelUpdate: PropTypes.func.isRequired,
  channelType: PropTypes.string
};

export default ChannelType;
