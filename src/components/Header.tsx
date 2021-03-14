import React, { memo } from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = memo(({ children }: HeaderProps) => (
  <header>
    <h2>{children}</h2>
  </header>
));

export default Header;
