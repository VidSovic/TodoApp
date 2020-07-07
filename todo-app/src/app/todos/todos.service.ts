import { Todo } from './todo.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TodosService{
  private todos: Todo[] = [];
  private todos_important: Todo[] = [];
  private todosUpdated = new Subject<Todo[]>();
  private todosUpdated_important = new Subject<Todo[]>();
  private todosCounter=0;

  getTodos(){
    return [...this.todos];
  }
  getTodosImportant(){
    return [...this.todos_important];
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
    this.todos_important = todos;
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
    for(let todo of this.todos_important){
      if(todo.id === id){
        if(todo.completed === false){
          this.todosCounter--;
        }
      }
  }
    this.todos_important = this.todos_important.filter(todos => todos.id !== id);
    this.todosUpdated_important.next([...this.todos_important]);
  }

  moveToImportantList(id:number){
      for(let todo of this.todos){
        if(todo.id === id){
          this.todos_important.push(todo);
          break;
        }
      }
      this.todosUpdated_important.next([...this.todos_important]);

      this.todos = this.todos.filter(todos => todos.id !== id);
      this.todosUpdated.next([...this.todos]);
  }

  moveToBasicList(id: number){
    for(let todo of this.todos_important){
      if(todo.id === id){
        this.todos.push(todo);
        break;
      }
    }
    this.todosUpdated.next([...this.todos]);
    this.todos_important = this.todos_important.filter(todos => todos.id !== id);
    this.todosUpdated_important.next([...this.todos_important]);
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
    for(let todo of this.todos_important){
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
    }
    console.log(this.todos_important);
    this.todosUpdated_important.next([...this.todos_important]);
  }

  /*
  sideToggle(id:number){
    for(let todo of this.todos){
      if(todo.id === id){
        if(todo.side == 'left'){todo.side='right';}
        else{todo.side='left';}
      }
    }
    this.todosUpdated.next([...this.todos]);
  }
  */

  removeCompleted(){
    this.todos = this.todos.filter(todos => todos.completed === false);
    this.todosUpdated.next([...this.todos]);
    this.todos_important = this.todos_important.filter(todos => todos.completed === false);
    this.todosUpdated_important.next([...this.todos_important]);
  }
}
