export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const UPDATE_TODO_STATUS = "UPDATE_TODO_STATUS";

export function createTodo(newTodo) {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

export function updateTodoStatus(todoId, checked) {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked,
    },
  };
}

export function deleteTodo(todoId) {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

export function toggleAllTodos() {
  return { type: TOGGLE_ALL_TODOS };
}
