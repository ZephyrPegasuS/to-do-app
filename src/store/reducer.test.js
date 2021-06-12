import reducer from "./reducer";
import {
  DELETE_TODO,
  UPDATE_TODO_STATUS,
  TOGGLE_ALL_TODOS,
  CREATE_TODO,
} from "./actions";
import { TODO_STATUS } from "../constants";

// DeleteTodo Test Case
test("#1. deleteTodo normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "sl2_uKp86",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  });
});

test("#2. deleteTodo normal case (with only one item at the beginning)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "sl2_uKp86",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

test("#3. deleteTodo abnormal case (the given id doesn't exist)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "iSEm3j3Cbf",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  });
});

test("#4. deleteTodo abnormal case (the todo list is empty from the beginning)", () => {
  const initialState = {
    todos: [],
  };

  const action = {
    type: DELETE_TODO,
    payload: "iSEm3j3Cbf",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

// UpdateTodoStatus Test Case
test("#5. updateTodoStatus normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: "sl2_uKp86",
      checked: true,
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.DONE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  });
});

test("#6. updateTodoStatus abnormal case (update id doesn't exist)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: "tHiSIdDoEsNtExIsT",
      checked: true,
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  });
});

// ToogleAllTodos Test Case
test("#7. toogleAllTodos normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  };

  const action = {
    type: TOGGLE_ALL_TODOS,
    payload: true,
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.DONE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  });
});

// CreateTodo Test Case
test("#8. createTodo normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
    ],
  };

  const action = {
    type: CREATE_TODO,
    payload: {
      id: "ab8_roiaOP",
      title: "Todo #3",
      status: TODO_STATUS.ACTIVE,
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        title: "Todo #1",
        status: TODO_STATUS.ACTIVE,
      },
      {
        id: "iSEm3j3Cbf",
        title: "Todo #2",
        status: TODO_STATUS.DONE,
      },
      {
        id: "ab8_roiaOP",
        title: "Todo #3",
        status: TODO_STATUS.ACTIVE,
      },
    ],
  });
});
