import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b lg:ml-64">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 hover:bg-gray-100 rounded"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Interface Monitoring System</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
