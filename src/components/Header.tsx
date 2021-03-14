import React, { memo } from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = memo(({ children }) => (
  <header>
    <h2>{children}</h2>
  </header>
));

export default Header;
