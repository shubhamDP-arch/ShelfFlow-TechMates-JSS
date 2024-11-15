import React from 'react';
import './Notification.css';

function Notification( {notification} ) {
    console.log(notification)
    return (
        <div className="notification-table-container">
            <h2 className="notification-table-title">Notifications</h2>
            <table className="notification-table">
                <thead>
                    <tr>
                        <th className="notification-table-header">Notification Type</th>
                        <th className="notification-table-header">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {notification.map((notif, index) => (
                        <tr key={index} className="notification-table-row">
                            <td className="notification-table-cell">{notif.notificationType}</td>
                            <td className="notification-table-cell">{notif.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notification;

