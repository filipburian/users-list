import React, { useState, useEffect } from 'react';
import useTranslations from '../hooks/useTranslations';

interface ErrorBannerProps {
  errorStatus?: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ errorStatus = '' }) => {
  const [visible, setVisible] = useState(true);
  const { t } = useTranslations();

  useEffect(() => {
    if (errorStatus) {
      setTimeout(() => setVisible(!visible), 3000);
    }
  }, []);

  return (
    <div className={visible ? 'errorBanner' : 'hidden'}>
      {`${errorStatus} ${t('errorMessage')}`}
    </div>
  );
};

export default ErrorBanner;
