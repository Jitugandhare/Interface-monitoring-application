// App.jsx
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import StatusChart from './components/dashboard/StatusChart';
import RecentLogs from './components/dashboard/RecentLogs';
import LogFilters from './components/logs/LogFilters';
import LogsTable from './components/logs/LogsTable';
import useSummary from './hooks/useSummary';
import useLogs from './hooks/useLogs';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [logFilters, setLogFilters] = useState({
    status: '',
    interfaceName: '',
    integrationKey: '',
    page: 1,
    limit: 50
  });

  const { summary, loading: summaryLoading, refetch: refetchSummary } = useSummary();
  const { logs: dashboardLogs, loading: dashboardLogsLoading } = useLogs({ limit: 10 });
  const {
    logs,
    loading: logsLoading,
    totalPages,
    currentPage,
    refetch: refetchLogs
  } = useLogs(logFilters);

  const handleLogPageChange = (newPage) => {
    setLogFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleLogFiltersChange = (newFilters) => {
    setLogFilters(newFilters);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto lg:ml-64">
          {currentView === 'dashboard' && (
            <div className="p-6 max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor your interface integrations in real-time</p>
              </div>

              <SummaryCards
                summary={summary}
                loading={summaryLoading}
                onRefresh={refetchSummary}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <StatusChart summary={summary} loading={summaryLoading} />
                <RecentLogs logs={dashboardLogs} loading={dashboardLogsLoading} />
              </div>
            </div>
          )}

          {currentView === 'logs' && (
            <div className="p-6 max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Interface Logs</h1>
                <p className="text-gray-600 mt-1">View and filter all interface integration logs</p>
              </div>

              <LogFilters
                filters={logFilters}
                onFiltersChange={handleLogFiltersChange}
                onRefresh={refetchLogs}
              />

              <LogsTable
                logs={logs}
                loading={logsLoading}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handleLogPageChange}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
