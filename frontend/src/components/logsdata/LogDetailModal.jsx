import React from 'react';
import { X } from 'lucide-react';
import  Badge from '../common/Badge';
import Button  from '../common/Button';

const LogDetailModal = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interface Name</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{log.interfaceName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Integration Key</label>
              <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">{log.integrationKey}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="mt-1">
                <Badge status={log.status}>{log.status}</Badge>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">
                {log.message || 'No message provided'}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;
