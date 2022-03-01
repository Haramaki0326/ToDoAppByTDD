import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('ToDoアプリ', () => {
  // 前準備
  beforeEach(() => {
    render(<App />);
  });

  // 仕様
  describe('入力項目（テキストボックス）を表示する', () => {
    test('入力項目（「ToDo:」テキストボックス）を表示する', () => {
      // 準備（Arrange）
      const todoText = screen.getByLabelText('ToDo:');
      // 実行（Act）
      // 検証（Assert）
      expect(todoText).toBeInTheDocument();
    });
  });

  describe('追加ボタンを表示する', () => {
    test('追加ボタンを表示する', () => {
      // 準備（Arrange）
      // const addButton = screen.getByTestId('addButton');
      const addButton = screen.getByText('追加');
      // 実行（Act）
      // 検証（Assert）
      expect(addButton).toBeInTheDocument();
    });
  });

  describe('一覧には追加したTODOリストが表示される', () => {
    describe('入力項目に値（TODO）を入力し、追加ボタンを押すと一覧に追加される', () => {
      test('TODOに「TEST1」と入力すると、TODOリストにその1件が表示される', () => {
        // 準備（Arrange）
        const addButton = screen.getByText('追加');
        const todoField = screen.getByTestId('todoField');

        // 実行（Act）
        userEvent.type(todoField, 'TEST1');
        userEvent.click(addButton);
        const addedItem = screen.getByText('TEST1');

        // 検証（Assert）
        expect(addedItem).toBeInTheDocument();
      });

      test('TODOに「TEST1」,「TEST2」,「TEST3」と入力すると、TODOリストにそれら3件が表示される', () => {
        // 準備（Arrange）
        const addButton = screen.getByText('追加');
        const todoField = screen.getByTestId('todoField');

        // 実行（Act）
        userEvent.type(todoField, 'TEST1');
        userEvent.click(addButton);
        userEvent.type(todoField, 'TEST2');
        userEvent.click(addButton);
        userEvent.type(todoField, 'TEST3');
        userEvent.click(addButton);

        const addedItem1 = screen.getByText('TEST1');
        const addedItem2 = screen.getByText('TEST2');
        const addedItem3 = screen.getByText('TEST3');

        // 検証（Assert）
        expect(addedItem1).toBeInTheDocument();
        expect(addedItem2).toBeInTheDocument();
        expect(addedItem3).toBeInTheDocument();
        expect(screen.getAllByText(/TEST./i)).toHaveLength(3);
      });
    });
  });

  describe('一覧上のTODOリストには削除ボタンが付属している', () => {
    test('一覧上のTODOリストには削除ボタンが付属している', () => {
      // 準備（Arrange）
      const addButton = screen.getByText('追加');
      const todoField = screen.getByTestId('todoField');

      // 実行（Act）
      userEvent.type(todoField, 'TEST1');
      userEvent.click(addButton);
      const deleteButton = screen.getByText('削除');

      // 検証（Assert）
      expect(deleteButton).toBeInTheDocument();
    });

    test('1件TODOを追加したのち、対象の削除ボタンをクリックすると対象のTODOが削除される', () => {
      // 準備（Arrange）
      const addButton = screen.getByText('追加');
      const todoField = screen.getByTestId('todoField');

      // 実行（Act）
      userEvent.type(todoField, 'TEST1');
      userEvent.click(addButton);
      const addedItem = screen.getByText('TEST1');

      const deleteButton = screen.getByText('削除');
      userEvent.click(deleteButton);

      // 検証（Assert）
      screen.debug();
      expect(addedItem).not.toBeInTheDocument();
    });

    test('4件TODOを追加したのち、2つ目の削除ボタンをクリックすると対象のTODOが削除される', () => {
      // 準備（Arrange）
      const addButton = screen.getByText('追加');
      const todoField = screen.getByTestId('todoField');

      // 実行（Act）
      userEvent.type(todoField, 'TEST1');
      userEvent.click(addButton);
      userEvent.type(todoField, 'TEST2');
      userEvent.click(addButton);
      userEvent.type(todoField, 'TEST3');
      userEvent.click(addButton);
      userEvent.type(todoField, 'TEST4');
      userEvent.click(addButton);

      const deleteButton2 = screen.getByTestId('deleteButton_1');
      userEvent.click(deleteButton2);
      const addedItem2 = screen.queryByText('TEST2');

      // 検証（Assert）
      expect(addedItem2).not.toBeInTheDocument();
    });
  });
});
