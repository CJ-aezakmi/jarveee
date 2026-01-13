import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setAccounts, setLoading } from '../store/slices/accountsSlice';
import { accountsAPI } from '../services/api';
import { Plus } from 'lucide-react';

export default function Accounts() {
  const dispatch = useAppDispatch();
  const { accounts, loading } = useAppSelector((state) => state.accounts);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await accountsAPI.getAll();
      dispatch(setAccounts(response.data));
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const platformColors: Record<string, string> = {
    instagram: 'bg-pink-500',
    facebook: 'bg-blue-600',
    twitter: 'bg-sky-500',
    linkedin: 'bg-blue-700',
    tiktok: 'bg-black',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Accounts</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Account
        </button>
      </div>

      {loading ? (
        <div>Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No accounts added yet</p>
          <button className="btn-primary">Add Your First Account</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      platformColors[account.platform] || 'bg-gray-500'
                    } flex items-center justify-center text-white font-bold`}
                  >
                    {account.platform[0].toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{account.username}</h3>
                    <p className="text-sm text-gray-500 capitalize">{account.platform}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    account.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : account.status === 'paused'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {account.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="text-lg font-semibold">{account.statistics?.followers || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Following</p>
                  <p className="text-lg font-semibold">{account.statistics?.following || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Posts</p>
                  <p className="text-lg font-semibold">{account.statistics?.posts || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
