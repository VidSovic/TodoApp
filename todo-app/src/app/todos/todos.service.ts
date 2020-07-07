import { Todo } from './todo.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TodosService{
  private todos: Todo[] = [];
  private todosImportant: Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();
  private todosUpdated_important = new Subject<Todo[]>();
  private todosCounter=0;

  getTodos(){
    return [...this.todos];
  }
  getTodosImportant(){
    return [...this.todosImportant];
  }

  getTodoUpdateListener(){
    return this.todosUpdated.asObservable();
  }
  getTodoUpdateListenerImportant(){
    return this.todosUpdated_important.asObservable();
  }

  syncTodos(todos: Todo[]){
    this.todos = todos;
    this.todosUpdated.next([...todos]);
  }
  syncTodosImportant(todos: Todo[]){
    this.todosImportant = todos;
    this.todosUpdated_important.next([...todos]);
  }

  addTodo(task: string){
    this.todosCounter++;
    const todo: Todo = {id: this.checkForNewId(),task: task,completed: false};
    this.todos = this.getTodos();
    this.todos.push(todo);
    this.todosUpdated.next([...this.todos]);
  }

  checkForNewId(){
    return this.todosCounter;
  }

  removeTodo(id: number){
    for(let todo of this.todos){
        if(todo.id === id){
          if(todo.completed === false){
            this.todosCounter--;
          }
        }
    }
    this.todos = this.todos.filter(todos => todos.id !== id);
    this.todosUpdated.next([...this.todos]);
  }

  removeTodoImportant(id: number){
    for(let todo of this.todosImportant){
      if(todo.id === id){
        if(todo.completed === false){
          this.todosCounter--;
        }
      }
  }
    this.todosImportant = this.todosImportant.filter(todos => todos.id !== id);
    this.todosUpdated_important.next([...this.todosImportant]);
  }

  moveToImportantList(id:number){
      for(let todo of this.todos){
        if(todo.id === id){
          this.todosImportant.push(todo);
          break;
        }
      }
      this.todosUpdated_important.next([...this.todosImportant]);

      this.todos = this.todos.filter(todos => todos.id !== id);
      this.todosUpdated.next([...this.todos]);
  }

  moveToBasicList(id: number){
    for(let todo of this.todosImportant){
      if(todo.id === id){
        this.todos.push(todo);
        break;
      }
    }
    this.todosUpdated.next([...this.todos]);
    this.todosImportant = this.todosImportant.filter(todos => todos.id !== id);
    this.todosUpdated_important.next([...this.todosImportant]);
  }

  checkToggle(id:number){
    for(let todo of this.todos){
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
    }
    console.log(this.todos);
    this.todosUpdated.next([...this.todos]);
  }
  checkToggleImportant(id:number){
    for(let todo of this.todosImportant){
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
    }
    console.log(this.todosImportant);
    this.todosUpdated_important.next([...this.todosImportant]);
  }

  removeCompleted(){
    this.todos = this.todos.filter(todos => todos.completed === false);
    this.todosUpdated.next([...this.todos]);
    this.todosImportant = this.todosImportant.filter(todos => todos.completed === false);
    this.todosUpdated_important.next([...this.todosImportant]);
  }
}
