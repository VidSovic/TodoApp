import { Todo } from './todos/todo.model';

export interface AppState {
  readonly todo: Todo[];
}
