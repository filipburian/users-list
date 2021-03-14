import React from 'react';
import useTranslations from '../hooks/useTranslations';

const NoResults: React.FC = () => {
  const { t } = useTranslations();

  return <div className="noResult centerText">{t('noResultMessage')}</div>;
};

export default NoResults;
