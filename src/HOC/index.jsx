import React from "react";
import SwitchTheme from "../components/SwitchTheme";
import {
  EMPTY_TASK_LIST,
  EMPTY_ACTIVE_TASK_LIST,
  EMPTY_DONE_TASK_LIST,
  TODO_STATUS,
} from "../constants";
import "./style.css";

export const withTaskListEmpty = (Component, statusFilter) => (props) =>
  !props.taskList.length ? (
    <div className='empty'>
      <img src='/empty.png' alt='image' height='85%' />
      <p>
        {statusFilter === "ALL"
          ? EMPTY_TASK_LIST
          : statusFilter === TODO_STATUS.ACTIVE
          ? EMPTY_ACTIVE_TASK_LIST
          : EMPTY_DONE_TASK_LIST}
      </p>
    </div>
  ) : (
    <Component {...props} />
  );

export const withThemeSwitcher = (Component, theme) => (props) => (
  <div className='display-button'>
    <Component {...props} />
    <SwitchTheme
      className='display-button__switch-theme'
      currentTheme={theme}
    />
  </div>
);
