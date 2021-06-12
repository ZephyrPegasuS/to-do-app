import React from "react";
import { uidGenerator } from "../utils";
import { TODO_STATUS } from "../constants";

class Services extends React.Component {
  async createTodo(title) {
    return Promise.resolve({
      id: uidGenerator(5),
      title: title,
      status: TODO_STATUS.ACTIVE,
    });
  }

  async getTodos() {
    return [];
  }
}

export default new Services();
