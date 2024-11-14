import React from 'react';
import './NotificationTable.css';

function Notification() {
    const notifications = [
        { type: 'Info', message: 'This is an informational message.' },
        { type: 'Warning', message: 'This is a warning message.' },
        { type: 'Error', message: 'This is an error message.' },
        { type: 'Success', message: 'Action completed successfully.' }
    ];

    return (
        <div className="notification-table-container">
            <h2 className="notification-table-title">Notifications</h2>
            <table className="notification-table">
                <thead>
                    <tr>
                        <th className="notification-table-header">Notification Type</th>
                        <th className="notification-table-header">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
                        <tr key={index} className="notification-table-row">
                            <td className="notification-table-cell">{notification.type}</td>
                            <td className="notification-table-cell">{notification.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NotificationTable;