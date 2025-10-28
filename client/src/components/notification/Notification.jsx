
import React from 'react';
import { Bell, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../essentials/Navbar';
// Mock Navbar component since it's not available


function Notification({ notification }) {
  const getNotificationIcon = (type) => {
    const iconProps = { size: 20, className: "flex-shrink-0" };
    
    switch (type?.toLowerCase()) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500 flex-shrink-0" />;
      case 'error':
      case 'danger':
        return <XCircle {...iconProps} className="text-red-500 flex-shrink-0" />;
      case 'warning':
        return <AlertCircle {...iconProps} className="text-yellow-500 flex-shrink-0" />;
      case 'info':
        return <Info {...iconProps} className="text-blue-500 flex-shrink-0" />;
      default:
        return <Bell {...iconProps} className="text-gray-500 flex-shrink-0" />;
    }
  };

  const getNotificationStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'success':
        return 'border-l-green-500 bg-green-50 hover:bg-green-100';
      case 'error':
      case 'danger':
        return 'border-l-red-500 bg-red-50 hover:bg-red-100';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 hover:bg-yellow-100';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 hover:bg-blue-100';
      default:
        return 'border-l-gray-500 bg-gray-50 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          <p className="text-gray-600">Stay updated with your laaaatest notifications</p>
        </div>

        {/* Notifications Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Notifications</h2>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {notification?.length || 0} total
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100">
            {notification && notification.length > 0 ? (
              notification.map((notif, index) => (
                <div
                  key={index}
                  className={`p-6 border-l-4 transition-all duration-200 cursor-pointer ${getNotificationStyle(notif.notificationType)}`}
                >
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notif.notificationType)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${notif.notificationType?.toLowerCase() === 'success' ? 'bg-green-100 text-green-800' :
                            notif.notificationType?.toLowerCase() === 'error' || notif.notificationType?.toLowerCase() === 'danger' ? 'bg-red-100 text-red-800' :
                            notif.notificationType?.toLowerCase() === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            notif.notificationType?.toLowerCase() === 'info' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}
                        >
                          {notif.notificationType || 'General'}
                        </span>
                        <span className="text-xs text-gray-500">
                          #{String(index + 1).padStart(3, '0')}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 font-medium mb-1">
                        {notif.description || 'No description available'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>•</span>
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-500">When you have notifications, they'll appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        {notification && notification.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing all {notification.length} notification{notification.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;