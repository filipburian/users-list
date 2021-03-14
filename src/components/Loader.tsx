import React from 'react';
import useTranslations from '../hooks/useTranslations';

const Loader = () => {
  const { t } = useTranslations();

  return <div className="loader">{t('loadingMessage')}</div>;
};

export default Loader;
