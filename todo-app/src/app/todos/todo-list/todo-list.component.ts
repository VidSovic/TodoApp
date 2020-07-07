import { Component, OnInit, OnDestroy, IterableDiffers } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import {Todo} from '../todo.model';
import { TodosService } from '../todos.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
//import * as TodoActions from './../../actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, OnDestroy{
  todos: Todo[] = [];
  todosImportant: Todo[] = [];
  private todosSub: Subscription;
  todosCount: number = 0;
  iterableDiffer: any;
  completed: boolean;
  active: boolean;
  all: boolean;

  //todosObservable: Observable<Todo[]>;


  constructor(public todosService: TodosService, private iterableDiffers: IterableDiffers, private store: Store<AppState>){
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    //this.todosObservable = store.select('todo');
  }

  ngOnInit(){
    this.todos = this.todosService.getTodos();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
        this.countActiveTasks();
    });
    this.completed = false;
    this.active = false;
    this.all = true;
  }
  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.todosImportant);
    if (changes) {
      this.todosService.syncTodosImportant(this.todosImportant);

    }
     changes = this.iterableDiffer.diff(this.todos);
    if(changes){
      this.todosService.syncTodos(this.todos);
    }
}

moveToBasicList(id: number){
  this.todosService.moveToBasicList(id);
  this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
    this.todos = todos;
});
  this.todosSub = this.todosService.getTodoUpdateListenerImportant().subscribe((todos: Todo[]) =>{
    this.todosImportant = todos;
  });
}

moveToImporantList(id: number){
    this.todosService.moveToImportantList(id);
    this.todosSub = this.todosService.getTodoUpdateListenerImportant().subscribe((todos: Todo[]) =>{
      this.todosImportant = todos;
    });
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
      this.todos = todos;
  });
}

  onRemoveTodo(id: number){
    this.todosService.removeTodo(id);
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
    });
  }

  onRemoveTodoImportant(id: number){
    this.todosService.removeTodoImportant(id);
    this.todosSub = this.todosService.getTodoUpdateListenerImportant().subscribe((todos: Todo[]) =>{
        this.todosImportant = todos;
    });
  }

  /*
  onRemoveTodoWithNgRx(index){
    this.store.dispatch(new TodoActions.RemoveTodo(index));
  }
  */

    checkToggle(id:number){
      this.todosService.checkToggle(id);
      this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
      this.todos = todos;
    });
    this.countActiveTasks();
    }

    checkToggleImportant(id:number){
      this.todosService.checkToggleImportant(id);
      this.todosSub = this.todosService.getTodoUpdateListenerImportant().subscribe((todosImportant: Todo[]) =>{
      this.todosImportant = todosImportant;
    });
    this.countActiveTasks();
    }

  showChecked(){
    this.completed = true;
    this.all = false;
    this.active = false;
  }
  showActive(){
    this.completed = false;
    this.all = false;
    this.active = true;
  }
  showAll(){
    this.completed = false;
    this.all = true;
    this.active = false;
  }

  countActiveTasks(){
    this.todosCount=0;
    for(let todo of this.todos){
      if(todo.completed === false){
        this.todosCount++;
      }
    }
    for(let todo of this.todosImportant){
      if(todo.completed === false){
        this.todosCount++;
      }
    }
  }

  onRemoveCompleted(){
    this.todosService.removeCompleted();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
      this.todos = todos;
    });
    this.todosSub = this.todosService.getTodoUpdateListenerImportant().subscribe((todos: Todo[]) =>{
      this.todosImportant = todos;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  ngOnDestroy(){
    this.todosSub.unsubscribe();
  }

}
