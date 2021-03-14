import React, { useEffect, useRef } from 'react';
import useTranslations from '../hooks/useTranslations';

interface SearchInputProps {
  onSearch: (searchPhrase: string) => void;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, value }) => {
  const { t } = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="searchInputWrapper">
      <input
        className="searchInput"
        placeholder={t('searchPlaceholder')}
        onChange={(e) => onSearch(e.target.value.trim())}
        value={value}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchInput;
