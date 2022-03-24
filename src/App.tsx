import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTodoList } from './hooks/useTodoList';
import { TodoList } from './components/TodoList';

function App() {
  const { todos, addTodo, deleteTodo } = useTodoList();
  const [text, setText] = useState<string>('');

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    addTodo(text);
    setText('');
  };

  const onClickDelete = useCallback(
    (key: string) => {
      deleteTodo(key);
    },
    [deleteTodo]
  );

  return (
    <div className='App'>
      <h1>ToDo App</h1>
      <form>
        <label htmlFor='todoInput'>
          ToDo
          <input
            type='text'
            id='todoInput'
            data-testid='todoField'
            value={text}
            onChange={onChangeText}
          />
        </label>
        <button
          type='button'
          id='addButton'
          data-testid='addButton'
          onClick={onClickAdd}
        >
          追加
        </button>
      </form>
      <p>ToDo一覧</p>
      <TodoList todos={todos} onClickDelete={onClickDelete} />
    </div>
  );
}

export default App;
