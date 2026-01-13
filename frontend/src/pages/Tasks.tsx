import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setTasks, setStatistics, setLoading } from '../store/slices/tasksSlice';
import { tasksAPI } from '../services/api';

export default function Tasks() {
  const dispatch = useAppDispatch();
  const { tasks, statistics, loading } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    loadTasks();
    loadStatistics();
  }, []);

  const loadTasks = async () => {
    dispatch(setLoading(true));
    try {
      const response = await tasksAPI.getAll();
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await tasksAPI.getStatistics();
      dispatch(setStatistics(response.data));
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tasks</h1>

      {/* Statistics */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{statistics.processing}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600">{statistics.completed}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Failed</p>
          <p className="text-2xl font-bold text-red-600">{statistics.failed}</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
        {loading ? (
          <div>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm capitalize">{task.type.replace('_', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">{task.priority}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
