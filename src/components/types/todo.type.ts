interface TodoRequestParams {
  id: number;
  todo: string;
  isCompleted: boolean;
}

export type AddTodoParams = Pick<TodoRequestParams, 'todo'>;

export type UpdateTodoParams = TodoRequestParams;

export type DeleteTodoParams = Pick<TodoRequestParams, 'id'>;

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
