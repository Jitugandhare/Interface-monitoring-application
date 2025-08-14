import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import  Button  from '../common/Button'; 

const LogFilters = ({ filters, onFiltersChange, onRefresh }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: '',
      interfaceName: '',
      integrationKey: '',
      startDate: '',
      endDate: '',
      page: 1
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Interface</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Interface name..."
              value={localFilters.interfaceName}
              onChange={(e) => setLocalFilters({ ...localFilters, interfaceName: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Integration Key</label>
          <input
            type="text"
            placeholder="Integration key..."
            value={localFilters.integrationKey}
            onChange={(e) => setLocalFilters({ ...localFilters, integrationKey: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={localFilters.status}
            onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="Success">Success</option>
            <option value="Failure">Failure</option>
            <option value="Warning">Warning</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleApply}>
            <Filter className="w-4 h-4 mr-2" />
            Apply
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogFilters;
