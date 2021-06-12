import React from "react";
import TaskItem from "../TaskItem";
import "./style.css";

const TaskList = (props) => {
  const { taskList, onDeleteToto, onUpdateTodoStatus, count } = props;
  return (
    <>
      <div className='task-list'>
        {taskList?.map((todo, index) => {
          return (
            <TaskItem
              key={index}
              todo={todo}
              deleteTodo={() => onDeleteToto(todo.id)}
              updateStatus={(e) => onUpdateTodoStatus(e, todo.id)}
            />
          );
        })}
      </div>
      <i className='task-list__count'>{count} item(s) in total</i>
    </>
  );
};

export default TaskList;
