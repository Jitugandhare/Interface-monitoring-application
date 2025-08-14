import React from 'react';

const Badge = ({ status, children }) => {
    const colors = {
        Success: 'bg-green-100 text-green-800 border-green-200',
        Failure: 'bg-red-100 text-red-800 border-red-200',
        Warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        default: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || colors.default}`}>
            {children}
        </span>
    );
};

export default Badge;
