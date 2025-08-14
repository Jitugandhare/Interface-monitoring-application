import React, { useState } from 'react';
import { Eye, FileText } from 'lucide-react';
import Badge from '../common/Badge'; 
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import LogDetailModal from './LogDetailModal';
import { formatDate } from '../../utils/formatDate';

const LogsTable = ({ logs, loading, totalPages, currentPage, onPageChange }) => {
  const [selectedLog, setSelectedLog] = useState(null);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
               
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interface</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log,index) => (
                <tr key={log._id} className="hover:bg-gray-50 transition-colors">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.interfaceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{log.integrationKey}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><Badge status={log.status}>{log.status}</Badge></td>
                  <td className="px-6 py-4 max-w-xs text-sm text-gray-900 truncate" title={log.message}>{log.message || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <button onClick={() => setSelectedLog(log)} className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium">No logs found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}

        {logs.length > 0 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        )}
      </div>

      {selectedLog && <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </>
  );
};

export default LogsTable;
