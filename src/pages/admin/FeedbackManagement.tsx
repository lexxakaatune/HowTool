import { useState, useEffect } from "react";
import { Eye, Clock, CheckCircle,Trash2 } from "lucide-react";
import { Feedback } from "../../data/store";
import { fetchFeedbacks } from "../../services/api";
 

// Feedback Management Component
const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'resolved'>('all');

  useEffect(() => {
    setFeedback(fetchFeedbacks());
  }, []);

  const handleStatusChange = (id: string, status: Feedback['status']) => {
    updateFeedbackStatus(id, status);
    setFeedback(fetchFeedbacks());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
      setFeedback(getFeedback());
    }
  };

  const filteredFeedback = feedback.filter(f => 
    filter === 'all' || f.status === filter
  );

  const getStatusIcon = (status: Feedback['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'read':
        return <Eye size={16} className="text-blue-500" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Feedback</h2>
        <div className="flex gap-2">
          {(['all', 'pending', 'read', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-500'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item) => (
          <div key={item.id} className="bg-dark-800 rounded-xl border border-dark-500 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-sm font-medium ${
                    item.status === 'pending' ? 'text-yellow-500' :
                    item.status === 'read' ? 'text-blue-500' :
                    'text-green-500'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{item.subject}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  From: {item.name} ({item.email})
                </p>
                <p className="text-gray-300">{item.message}</p>
              </div>
              <div className="flex flex-col gap-2">
                {item.status !== 'read' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'read')}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    title="Mark as Read"
                  >
                    <Eye size={18} />
                  </button>
                )}
                {item.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'resolved')}
                    className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                    title="Mark as Resolved"
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredFeedback.length === 0 && (
          <div className="text-center py-12 bg-dark-800 rounded-xl border border-dark-500">
            <p className="text-gray-400">No feedback found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManagement; 