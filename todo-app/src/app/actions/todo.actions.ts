
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Todo } from '../todos/todo.model';

export const ADD_TODO       = '[TODO] Add';
export const REMOVE_TODO    = '[TODO] Remove';

export class AddTodo implements Action {
    readonly type = ADD_TODO;

    constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
    readonly type = REMOVE_TODO;

    constructor(public payload: number) {}
}

export type Actions = AddTodo | RemoveTodo;
