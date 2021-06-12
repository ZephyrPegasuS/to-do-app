import React from "react";
import "./style.css";

const ActionButton = (props) => {
  const { actionList, currentShowing } = props;
  return (
    <div className='action-button'>
      {actionList?.length > 0 &&
        actionList.map((item, index) => {
          return (
            <button
              className={
                item.value === currentShowing ? "action-button__active" : ""
              }
              key={index}
              onClick={item.action}
              disabled={item.isDisabled}
              title={item.tooltip}
            >
              {item.value}
            </button>
          );
        })}
    </div>
  );
};

export default ActionButton;
