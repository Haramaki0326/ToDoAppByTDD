/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../types/todo';

export const useTodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      key: uuidv4(),
      content: text,
    };
    const newTodos = [...todos];
    newTodos.push(newTodo);
    setTodos(newTodos);
  };

  const deleteTodo = (key: string) => {
    const newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };

  return { todos, addTodo, deleteTodo };
};
