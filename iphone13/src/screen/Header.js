import React from 'react';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/images/logo.png'}
        alt="Logo"
        style={{ position: 'absolute', width: '296px', height: '73px', left: '8px', top: '32px' }}/>
      <DropdownMenu />
    </div>
  );
};

export default Header;
