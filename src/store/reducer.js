import {
  CREATE_TODO,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";
import { TODO_STATUS } from "../constants";

export const initialState = {
  todos: JSON.parse(localStorage.getItem("todoStorage") || "[]"),
};

function reducer(state, action) {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state,
      };

    case UPDATE_TODO_STATUS:
      let statusIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      if (statusIndex > -1)
        state.todos[statusIndex].status = action.payload.checked
          ? TODO_STATUS.DONE
          : TODO_STATUS.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status:
            e.status === TODO_STATUS.ACTIVE
              ? TODO_STATUS.DONE
              : TODO_STATUS.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

export default reducer;
