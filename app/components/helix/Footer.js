import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const now = moment.utc();
  const year = now.year();
  return (
    <footer id="foot" className="footer">
      &copy;
      {t('common:footer.content.company', { year })}
      <nav>
        <a href="https://www.rackspace.com/information/legal/websiteterms">{t('common:footer.content.terms')}</a>
        <a href="https://www.rackspace.com/information/legal/privacystatement">{t('common:footer.content.policy')}</a>
      </nav>
    </footer>
  );
};

export default Footer;
