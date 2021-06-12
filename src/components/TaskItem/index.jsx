import React from "react";
import { isTodoDone } from "../../utils";
import { CONFIRM_DELETE_TASK } from "../../constants";
import "./style.css";

const TaskItem = (props) => {
  const { todo, deleteTodo, updateStatus } = props;

  return (
    <div className='task-item'>
      <input
        type='checkbox'
        checked={isTodoDone(todo)}
        onChange={updateStatus}
      />
      <span>{todo.title}</span>
      <button
        className='task-item__delete'
        onClick={() => {
          if (window.confirm(CONFIRM_DELETE_TASK)) deleteTodo();
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default TaskItem;
