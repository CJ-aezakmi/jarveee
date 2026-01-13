import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setCampaigns, setLoading } from '../store/slices/campaignsSlice';
import { campaignsAPI } from '../services/api';
import { Plus } from 'lucide-react';

export default function Campaigns() {
  const dispatch = useAppDispatch();
  const { campaigns, loading } = useAppSelector((state) => state.campaigns);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    dispatch(setLoading(true));
    try {
      const response = await campaignsAPI.getAll();
      dispatch(setCampaigns(response.data));
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <button className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Campaign
        </button>
      </div>

      {loading ? (
        <div>Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">No campaigns created yet</p>
          <button className="btn-primary">Create Your First Campaign</button>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <span
                      className={`ml-3 px-2 py-1 text-xs rounded-full ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  {campaign.description && (
                    <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                  )}
                  <div className="flex items-center mt-3 space-x-4">
                    <span className="text-sm text-gray-500 capitalize">{campaign.type}</span>
                    <span className="text-sm text-gray-500 capitalize">{campaign.platform}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {campaign.statistics?.totalActions || 0}
                    </p>
                    <p className="text-xs text-gray-500">Total Actions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {campaign.statistics?.successfulActions || 0}
                    </p>
                    <p className="text-xs text-gray-500">Successful</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
