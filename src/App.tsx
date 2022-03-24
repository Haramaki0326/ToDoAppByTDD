import React, { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from './types/todo';
import { TodoList } from './components/TodoList';

function App() {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    const newTodo: Todo = {
      key: uuidv4(),
      content: text,
    };
    const newTodos = [...todos];
    newTodos.push(newTodo);
    setTodos(newTodos);
    setText('');
  };

  const onClickDelete = (key: string) => {
    const newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };

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
