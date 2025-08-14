
import React from 'react';
import { BarChart3, FileText, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentView, onNavigate }) => {
    const navigation = [
        { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
        { id: 'logs', name: 'Logs', icon: FileText },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-40" onClick={onClose}></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">Interface Monitor</h1>
                    <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id);
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
