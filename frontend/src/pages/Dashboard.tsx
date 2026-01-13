import { useEffect, useState } from 'react';
import { analyticsAPI } from '../services/api';
import { Users, Target, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await analyticsAPI.getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const statCards = [
    {
      name: 'Total Accounts',
      value: stats?.accounts?.total || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Campaigns',
      value: stats?.campaigns?.active || 0,
      icon: Target,
      color: 'bg-green-500',
    },
    {
      name: 'Completed Tasks',
      value: stats?.tasks?.completed || 0,
      icon: CheckCircle2,
      color: 'bg-purple-500',
    },
    {
      name: 'New Followers',
      value: stats?.growth?.followers?.thisWeek || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Tasks</span>
              <span className="font-semibold">{stats?.tasks?.pending || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Accounts</span>
              <span className="font-semibold">{stats?.accounts?.active || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Engagement</span>
              <span className="font-semibold">
                {(stats?.growth?.engagement?.likes || 0) +
                  (stats?.growth?.engagement?.comments || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
