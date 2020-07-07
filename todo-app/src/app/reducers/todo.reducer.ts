import { Action } from '@ngrx/store';
import { Todo } from '../todos/todo.model';
import * as TodoActions from './../actions/todo.actions';

const initialState: Todo = {
    id: 1,
    task: 'test state',
    completed: false
}

export function reducer(state: Todo[] = [], action: TodoActions.Actions) {

    switch(action.type) {
        case TodoActions.ADD_TODO:
            return [...state, action.payload];
        case TodoActions.REMOVE_TODO:
            state.splice(action.payload, 1)
            return state;
        default:
            return state;
    }
}
