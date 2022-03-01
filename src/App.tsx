import React, { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickAdd = () => {
    const newTodos = [...todos];
    newTodos.push(text);
    setTodos(newTodos);
    setText('');
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className='App'>
      <form>
        <label htmlFor='todoInput'>
          ToDo:
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
      <ul>
        {todos.map((todo, index) => (
          <li key={uuidv4()}>
            {todo}
            <button
              type='button'
              data-testid={`deleteButton_${index}`}
              onClick={() => onClickDelete(index)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
