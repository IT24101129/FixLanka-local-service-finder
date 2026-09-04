import React from 'react';
import { Clock, CheckCircle2, PlayCircle, CheckCheck, XCircle } from 'lucide-react';

const StatusBadge = ({ status = 'Pending' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Pending':
        return { className: 'badge badge-pending', icon: <Clock size={14} />, text: 'Pending' };
      case 'Accepted':
        return { className: 'badge badge-accepted', icon: <CheckCircle2 size={14} />, text: 'Accepted' };
      case 'In Progress':
        return { className: 'badge badge-inprogress', icon: <PlayCircle size={14} />, text: 'In Progress' };
      case 'Completed':
        return { className: 'badge badge-completed', icon: <CheckCheck size={14} />, text: 'Completed' };
      case 'Cancelled':
        return { className: 'badge badge-cancelled', icon: <XCircle size={14} />, text: 'Cancelled' };
      default:
        return { className: 'badge badge-pending', icon: <Clock size={14} />, text: status };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={config.className}>
      {config.icon}
      {config.text}
    </span>
  );
};


export default StatusBadge;
