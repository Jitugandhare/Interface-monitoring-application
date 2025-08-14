import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddLogForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    interfaceName: '',
    integrationKey: '',
    status: 'Success',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/logs', formData);
      setFormData({
        interfaceName: '',
        integrationKey: '',
        status: 'Success',
        message: '',
      });
      toast.success('Log created successfully!',{position:"top-center"});
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to create log');
      toast.error('Failed to create log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900">Add New Log</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="interfaceName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Interface Name
        </label>
        <input
          id="interfaceName"
          type="text"
          name="interfaceName"
          value={formData.interfaceName}
          onChange={handleChange}
          required
          placeholder="Enter interface name"
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      <div>
        <label
          htmlFor="integrationKey"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Integration Key
        </label>
        <input
          id="integrationKey"
          type="text"
          name="integrationKey"
          value={formData.integrationKey}
          onChange={handleChange}
          required
          placeholder="Enter integration key"
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
          <option value="Warning">Warning</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Additional info or error message"
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white font-semibold py-3 rounded-lg shadow-md
          bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700
          hover:from-blue-600 hover:via-blue-700 hover:to-indigo-800
          focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Adding...' : 'Add Log'}
      </button>
    </form>
  );
};

export default AddLogForm;
