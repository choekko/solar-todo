import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  targetDate: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [nextIdState, setNextIdState] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState, nextIdState]);

  const incrementNextId = () => {
    setNextIdState(prevState => prevState + 1)
  };

  const toggleTodo = (id: number) => {
    const todoStateTmp = [...todoState];
    const targetIndex = todoState.findIndex((todo) => todo.id === id);
    todoStateTmp[targetIndex].done = !todoStateTmp[targetIndex].done;
    setTodoState((prevState) => todoStateTmp);
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    const nextId = nextIdState;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId
      })
    );
  };

  const loadData = () => {
    let data = localStorage.getItem("todos");
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    const nextId = localStorage.getItem("nextId");
    if (nextId !== undefined) {
        setNextIdState(JSON.parse(nextId!));
    }
    if (!initialTodos || initialTodos.length == 0) {
        setNextIdState(0)
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
    localStorage.setItem("nextId", JSON.stringify(nextIdState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo
  };
};
