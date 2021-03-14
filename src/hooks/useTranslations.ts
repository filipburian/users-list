import { useCallback } from 'react';
import translations from '../translations/en_GB';

const useTranslations = () => {
  const t = useCallback((key): string => translations[key.trim()] || key.trim(), []);

  return { t };
};

export default useTranslations;
