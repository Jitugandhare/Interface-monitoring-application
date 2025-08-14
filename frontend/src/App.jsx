import React, { useState, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import SummaryCards from './components/dashboard/SummaryCards';
import StatusChart from './components/dashboard/StatusChart';
import RecentLogs from './components/dashboard/RecentLogs';
import LogFilters from './components/logsdata/LogFilters';
import LogsTable from './components/logsdata/LogsTable';
import AddLogForm from './components/logsdata/AddLogForm';
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
    limit: 50,
  });

  const { summary, loading: summaryLoading, refetch: refetchSummary } = useSummary();

  
  const dashboardLogFilters = useMemo(() => ({ limit: 10 }), []);
  const { logs: dashboardLogs, loading: dashboardLogsLoading } = useLogs(dashboardLogFilters);

  const {
    logs,
    loading: logsLoading,
    totalPages,
    currentPage,
    refetch: refetchLogs,
  } = useLogs(logFilters);

  const handleLogPageChange = (newPage) => {
    setLogFilters((prev) => ({ ...prev, page: newPage }));
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
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">
                    Monitor your interface integrations in real-time
                  </p>
                </div>
               
                <button
                  onClick={() => setCurrentView('add-log')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ➕ Add Log
                </button>
              </div>

              <SummaryCards
                summary={summary}
                loading={summaryLoading}
                onRefresh={refetchSummary}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <StatusChart summary={summary} loading={summaryLoading} />
                <RecentLogs logs={dashboardLogs} loading={dashboardLogsLoading} />
              </div>
            </div>
          )}

          {currentView === 'logs' && (
            <div className="p-6 max-w-7xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Interface Logs</h1>
                  <p className="text-gray-600 mt-1">
                    View and filter all interface integration logs
                  </p>
                </div>
                
                <button
                  onClick={() => setCurrentView('add-log')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ➕ Add Log
                </button>
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

          {currentView === 'add-log' && (
            <div className="p-6 max-w-3xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Add Log</h1>
                <p className="text-gray-600 mt-1">Submit a new integration log</p>
              </div>

              <AddLogForm
                onSuccess={() => {
                  alert('Log created successfully!');
                  setCurrentView('logs'); 
                }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
