import { useEffect, useState } from 'react';
import axios from 'axios';

const useSummary = () => {
    const [summary, setSummary] = useState({
        total: 0,
        success: 0,
        failure: 0,
        warning: 0
    });
    const [loading, setLoading] = useState(false);

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/logs/summary');
            setSummary(res.data || {});
        } catch (error) {
            console.error('Failed to fetch summary:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return { summary, loading, refetch: fetchSummary };
};

export default useSummary;
