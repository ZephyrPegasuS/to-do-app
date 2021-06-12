import { TODO_STATUS } from "../constants";

export const isTodoDone = (todo) => {
  return todo.status === TODO_STATUS.DONE;
};

export const isTodoActive = (todo) => {
  return todo.status === TODO_STATUS.ACTIVE;
};

export const uidGenerator = (length) => {
  return Math.random()
    .toString(36)
    .slice(2, length + 2);
};
