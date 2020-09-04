import React from 'react';
import { Alert } from '@helix-design-system/helix-react';
import { useTranslation } from 'react-i18next';

const UserPermissionAlert = (props) => {
  const { t } = useTranslation();
  const submit = () => {
    window.open('https://one.rackspace.com/display/IDPLAT/Jupiter+-+Internal+Cart', '_blank');
  };
  return (
    <Alert
      className="u-space-top"
      type="error"
      static
      show
      persist
      cta={t('account:user.tip.viewDocumentation')}
      onSubmit={submit}
    >
      <p>{t('account:user.tip.invalidAccountPermission')}</p>
      <small>
        {t('account:actions.jupiter.goToProductGuide')}
      </small>
    </Alert>
  );
};

export default UserPermissionAlert;
