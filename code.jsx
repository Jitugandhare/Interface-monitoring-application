import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle,
  Menu,
  X,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw
} from 'lucide-react';

// API Service
const api = {
  baseURL: '/api',
  
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  }
};

// Date formatting helper
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Custom Hooks
const useLogs = (filters) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await api.get('/logs', filters);
      setLogs(data.logs || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // Mock data for demo
      setLogs([
        {
          _id: '1',
          interfaceName: 'Payment Gateway',
          integrationKey: 'PG001',
          status: 'Success',
          message: 'Transaction processed successfully',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          interfaceName: 'User Service',
          integrationKey: 'US001',
          status: 'Failure',
          message: 'Database connection timeout',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [JSON.stringify(filters)]);

  return { logs, loading, totalPages, currentPage, refetch: fetchLogs };
};

const useSummary = () => {
  const [summary, setSummary] = useState({ Success: 0, Failure: 0, Warning: 0 });
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await api.get('/logs/summary');
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
      // Mock data for demo
      setSummary({ Success: 150, Failure: 12, Warning: 8 });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { summary, loading, refetch: fetchSummary };
};

// UI Components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

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

const Button = ({ variant = 'primary', size = 'md', children, className = '', disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md disabled:bg-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 disabled:bg-gray-100',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500 disabled:bg-gray-50'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Simple Canvas Chart Component
const DonutChart = ({ data, total }) => {
  const canvasRef = React.useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 50;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const colors = {
      Success: '#10B981',
      Failure: '#EF4444',
      Warning: '#F59E0B'
    };
    
    let currentAngle = -Math.PI / 2;
    
    Object.entries(data).forEach(([status, value]) => {
      if (value > 0) {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[status];
        ctx.fill();
        
        currentAngle += sliceAngle;
      }
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw total in center
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY - 5);
    
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Total', centerX, centerY + 15);
    
  }, [data, total]);
  
  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={200} height={200} className="mb-4" />
      <div className="flex space-x-4 text-sm">
        {Object.entries(data).map(([status, value]) => {
          const colors = {
            Success: 'bg-green-500',
            Failure: 'bg-red-500',
            Warning: 'bg-yellow-500'
          };
          return (
            <div key={status} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${colors[status]} mr-2`}></div>
              <span className="text-gray-700">{status}: {value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Layout Components
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
                className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
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

// Dashboard Components
const SummaryCards = ({ summary, loading, onRefresh }) => {
  const cards = [
    {
      title: 'Success',
      value: summary.Success,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Failures',
      value: summary.Failure,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Warnings',
      value: summary.Warning,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className={`bg-white p-6 rounded-lg shadow-sm border-2 ${card.borderColor} hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

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

// Logs Components
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interface
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Integration Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.interfaceName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">{log.integrationKey}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={log.status}>{log.status}</Badge>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={log.message}>
                      {log.message || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                    >
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-xl">
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
                <button 
                  onClick={() => setSelectedLog(null)}
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
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedLog.interfaceName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Integration Key</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">{selectedLog.integrationKey}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="mt-1">
                    <Badge status={selectedLog.status}>{selectedLog.status}</Badge>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {new Date(selectedLog.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedLog.message || 'No message provided'}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedLog(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Application Component
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

  // Dashboard data
  const { summary, loading: summaryLoading, refetch: refetchSummary } = useSummary();
  const { logs: dashboardLogs, loading: dashboardLogsLoading } = useLogs({ limit: 10 });
  
  // Logs page data
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