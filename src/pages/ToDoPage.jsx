import React, { useEffect, useReducer, useRef, useState } from "react";
import reducer, { initialState } from "../store/reducer";
import {
  createTodo,
  deleteTodo,
  toggleAllTodos,
  updateTodoStatus,
} from "../store/actions";
import Services from "../service";
import { isTodoDone, uidGenerator } from "../utils";
import {
  TASK_PLACEHOLDER,
  CREATED_SUCCESS,
  CREATED_FAILED,
  DELETED_SUCCESS,
  TOGGLE_ALL_SUCCESS,
  ALL_TOOLTIP,
  ACTIVE_TOOLTIP,
  DONE_TOOLTIP,
  TOGGLE_ALL_TOOLTIP,
  TODO_STATUS,
} from "../constants";
import ActionButton from "../components/ActionButton";
import TaskList from "../components/TaskList";
import Notification from "../components/Notification";
import { withTaskListEmpty, withThemeSwitcher } from "../HOC";
import "./style.css";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState("ALL");
  const [notify, setNotify] = useState([]);
  const inputRef = useRef(null);
  let notifyItem = null;

  // Check current theme
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  // Update the todo list into local storage
  useEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(todos));
  }, [{ todos }]);

  // Show notification with unique id
  const showNotification = (type, message) => {
    notifyItem = {
      id: uidGenerator(5),
      type: type,
      message: message,
    };
    setNotify([...notify, notifyItem]);
  };

  const removeNotification = (id) => {
    notify.filter((item) => item.id !== id);
    setNotify(notify.filter((item) => item.id !== id));
  };

  // Create a new todo
  const onCreateTodo = async (e) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value?.trim()) {
        const resp = await Services.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        showNotification("Success", CREATED_SUCCESS);
      } else showNotification("Error", CREATED_FAILED);
      inputRef.current.value = "";
    }
  };

  // Update todo's status
  const onUpdateTodoStatus = (e, todoId) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  // Toggle all todo
  const onToggleAllTodo = () => {
    dispatch(toggleAllTodos());
    showNotification("Success", TOGGLE_ALL_SUCCESS);
  };

  // Filter todo (active, done)
  const showTodos = todos?.filter((todo) => {
    switch (showing) {
      case TODO_STATUS.ACTIVE:
        return todo.status === TODO_STATUS.ACTIVE;
      case TODO_STATUS.DONE:
        return todo.status === TODO_STATUS.DONE;
      default:
        return true;
    }
  });

  const activeTodos = todos?.reduce(function (accum, todo) {
    return isTodoDone(todo) ? accum : accum + 1;
  }, 0);

  // Define some action button list
  const actionList = [
    {
      value: "ALL",
      action: () => setShowing("ALL"),
      isDisabled: false,
      tooltip: ALL_TOOLTIP,
    },
    {
      value: TODO_STATUS.ACTIVE,
      action: () => setShowing(TODO_STATUS.ACTIVE),
      isDisabled: false,
      tooltip: ACTIVE_TOOLTIP,
    },
    {
      value: TODO_STATUS.DONE,
      action: () => setShowing(TODO_STATUS.DONE),
      isDisabled: false,
      tooltip: DONE_TOOLTIP,
    },
    {
      value: "TOGGLE ALL",
      action: () => onToggleAllTodo(),
      isDisabled: todos.length < 1,
      tooltip: TOGGLE_ALL_TOOLTIP,
    },
  ];

  // Delete todo
  const onDeleteToto = (id) => {
    dispatch(deleteTodo(id));
    showNotification("Success", DELETED_SUCCESS);
  };

  // Showing Total Item
  const totalItems = () => {
    switch (showing) {
      case TODO_STATUS.ACTIVE:
        return activeTodos;
      case TODO_STATUS.DONE:
        return todos.length - activeTodos;
      default:
        return todos.length;
    }
  };

  const EnhancedTaskList = withTaskListEmpty(TaskList, showing);
  const ActionButtonWithThemeSwitcher = withThemeSwitcher(ActionButton);

  return (
    <div className='to-do-page'>
      <h1 className='to-do-page__title'>Todo App</h1>
      <div className='to-do-page__creation'>
        <input
          ref={inputRef}
          className='to-do-page__input'
          placeholder={TASK_PLACEHOLDER}
          onKeyDown={onCreateTodo}
        />
      </div>
      <ActionButtonWithThemeSwitcher
        actionList={actionList}
        currentShowing={showing}
      />
      <EnhancedTaskList
        taskList={showTodos}
        onDeleteToto={onDeleteToto}
        onUpdateTodoStatus={onUpdateTodoStatus}
        count={totalItems()}
      />
      <Notification
        notifyList={notify}
        position='bottom-right'
        autoDelete={true}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default ToDoPage;
