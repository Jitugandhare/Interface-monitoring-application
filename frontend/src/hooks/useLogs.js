import { useEffect, useState } from 'react';
import axios from 'axios';

const useLogs = (filters) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/logs', { params: filters });
      setLogs(res.data.logs || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  return { logs, loading, totalPages, refetch: fetchLogs };
};

export default useLogs;
