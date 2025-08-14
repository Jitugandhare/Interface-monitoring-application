import React from 'react';
import { BarChart3 } from 'lucide-react';
import DonutChart from '../common/DonutChart';
import  LoadingSpinner  from '../common/LoadingSpinner';

const StatusChart = ({ summary, loading }) => {
  if (loading) return <LoadingSpinner />;

  const total = summary.Success + summary.Failure + summary.Warning;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Distribution (Last 24h)</h3>
      {total > 0 ? (
        <DonutChart data={summary} total={total} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default StatusChart;
