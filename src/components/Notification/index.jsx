import React, { useState, useEffect } from "react";
import "./style.css";

const Notification = (props) => {
  const { notifyList, position, autoDelete, removeNotification } = props;
  const [list, setList] = useState(notifyList);

  useEffect(() => {
    setList(notifyList);
  }, [notifyList]);

  // Auto remove the notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && notifyList.length && list.length) {
        deleteNotify(notifyList[0].id);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [notifyList, list]);

  // Check notification's type
  const handleNotifyType = (type) => {
    switch (type) {
      case "Success":
        return "#5cb85c";
      case "Error":
        return "#d9534f";
      default:
        return "#5bc0de";
    }
  };

  // Delete notification by manual
  const deleteNotify = (id) => {
    const index = list.findIndex((el) => el.id === id);
    list.splice(index, 1);
    removeNotification(id);
    setList([...list]);
  };

  return (
    <div className={`notification-container ${position}`}>
      {list.map((notify, i) => (
        <div
          key={i}
          className={`notification ${position}`}
          style={{ backgroundColor: handleNotifyType(notify.type) }}
        >
          <span className='closebtn' onClick={() => deleteNotify(notify.id)}>
            &times;
          </span>
          {notify.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
