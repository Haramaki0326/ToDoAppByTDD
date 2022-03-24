/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import type { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  onClickDelete: (index: string) => void;
};

export const TodoList: React.VFC<Props> = (props) => {
  const { todos, onClickDelete } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.key}>
          {todo.content}
          <button
            type='button'
            data-testid={`deleteButton_${todo.content}`}
            onClick={() => onClickDelete(todo.key)}
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};
