import { Todo } from './todo.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TodosService{
  private todos: Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();

  getTodos(){
    return [...this.todos];
  }

  getTodoUpdateListener(){
    return this.todosUpdated.asObservable();
  }

  addTodo(task: string){
    const todo: Todo = {id: this.checkForNewId(),task: task,side: 'left',completed: false};
    this.todos.push(todo);
    this.todosUpdated.next([...this.todos]);
    console.log(this.todos);
  }

  checkForNewId(){
    if(this.todos.length <= 0){return 1}
    return this.todos[this.todos.length-1].id+1;
  }

  removeTodo(id: number){
    this.todos = this.todos.filter(todos => todos.id !== id);
    this.todosUpdated.next([...this.todos]);
  }

  checkToggle(id:number){
    for(let todo of this.todos){
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
    }
    this.todosUpdated.next([...this.todos]);
  }

  sideToggle(id:number){
    for(let todo of this.todos){
      if(todo.id === id){
        if(todo.side == 'left'){todo.side='right';}
        else{todo.side='left';}
      }
    }
    this.todosUpdated.next([...this.todos]);
  }
}
