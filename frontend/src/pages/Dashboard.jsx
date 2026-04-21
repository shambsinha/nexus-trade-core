import { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Edit2, TrendingUp, DollarSign } from 'lucide-react';
import api from '../api/axios';

const Dashboard = ({ setIsAuthenticated }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [formData, setFormData] = useState({
    symbol: '',
    targetPrice: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get('/assets');
      setAssets(response.data);
    } catch (err) {
      setError('Failed to fetch assets');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.symbol || !formData.targetPrice) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (editingAsset) {
        await api.put(`/assets/${editingAsset.id}`, formData);
        setSuccess('Asset updated successfully!');
      } else {
        await api.post('/assets', formData);
        setSuccess('Asset added successfully!');
      }
      
      setFormData({ symbol: '', targetPrice: '' });
      setShowAddForm(false);
      setEditingAsset(null);
      fetchAssets();
    } catch (err) {
      setError(err.response?.data || 'Operation failed');
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setFormData({
      symbol: asset.symbol,
      targetPrice: asset.targetPrice
    });
    setShowAddForm(true);
  };

  const handleDelete = async (assetId) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return;
    }

    try {
      await api.delete(`/assets/${assetId}`);
      setSuccess('Asset deleted successfully!');
      fetchAssets();
    } catch (err) {
      setError('Failed to delete asset');
    }
  };

  const resetForm = () => {
    setFormData({ symbol: '', targetPrice: '' });
    setShowAddForm(false);
    setEditingAsset(null);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NexusTrade</h1>
                <p className="text-sm text-gray-500">Trading Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-danger"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-6">
            {success}
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Assets</h2>
              <p className="text-gray-600 mt-1">Manage your trading portfolio</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </button>
          </div>

          {showAddForm && (
            <div className="card mb-6">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingAsset ? 'Edit Asset' : 'Add New Asset'}
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="symbol" className="block text-sm font-semibold text-gray-700 mb-2">
                        Symbol
                      </label>
                      <input
                        type="text"
                        id="symbol"
                        value={formData.symbol}
                        onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                        className="form-input"
                        placeholder="e.g., AAPL, GOOGL"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="targetPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                        Target Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="targetPrice"
                          value={formData.targetPrice}
                          onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                          className="form-input pl-8"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {editingAsset ? 'Update' : 'Add'} Asset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {assets.length === 0 ? (
            <div className="card text-center py-12">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No assets yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start building your trading portfolio by adding your first asset to track
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Asset
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio Overview</h3>
                <p className="text-sm text-gray-500">{assets.length} assets tracked</p>
              </div>
              <div className="divide-y divide-gray-200">
                {assets.map((asset) => (
                  <div key={asset.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-14 w-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-lg">{asset.symbol.substring(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{asset.symbol}</h4>
                          <p className="text-sm text-gray-600">
                            Target: <span className="font-medium text-gray-900">${parseFloat(asset.targetPrice).toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(asset)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
