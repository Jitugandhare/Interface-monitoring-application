import React from 'react';
import { FileText } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import  Badge  from '../common/Badge';
import  LoadingSpinner from '../common/LoadingSpinner';

const RecentLogs = ({ logs, loading }) => {
  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {logs.slice(0, 10).map((log) => (
          <div key={log._id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  log.status === 'Success' ? 'bg-green-500' :
                  log.status === 'Failure' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.interfaceName}</p>
                  <p className="text-xs text-gray-500">{log.integrationKey}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge status={log.status}>{log.status}</Badge>
                <span className="text-xs text-gray-500">{formatDate(log.createdAt)}</span>
              </div>
            </div>
            {log.message && (
              <p className="mt-2 text-sm text-gray-600 ml-5">{log.message}</p>
            )}
          </div>
        ))}
      </div>
      {logs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentLogs;
