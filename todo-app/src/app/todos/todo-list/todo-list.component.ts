import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {Todo} from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, OnDestroy{
  todos: Todo[] = [];
  private todosSub: Subscription;
  todosCount: number = 0;


  constructor(public todosService: TodosService){}

  ngOnInit(){
    this.todos = this.todosService.getTodos();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
        this.countActiveTasks();
    });
  }

  onRemoveTodo(id: number){
    this.todosService.removeTodo(id);
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
    });
  }

    checkToggle(id:number){
      this.todosService.checkToggle(id);
      this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
      this.todos = todos;
    });
    this.countActiveTasks();
    }

  ngOnDestroy(){
    this.todosSub.unsubscribe();
  }

  showChecked(){
    this.todos = this.todosService.getTodos();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
    });
    this.todos = this.todos.filter(todos => todos.completed === true);
  }
  showActive(){
    this.todos = this.todosService.getTodos();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
    });
    this.todos = this.todos.filter(todos => todos.completed === false);
  }
  showAll(){
    this.todos = this.todosService.getTodos();
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
        this.todos = todos;
    });
  }

  countActiveTasks(){
    this.todosCount=0;
    for(let todo of this.todos){
      if(todo.completed === false){
        this.todosCount++;
      }
    }
  }

  sideToggle(id:number){
    this.todosService.sideToggle(id);
    this.todosSub = this.todosService.getTodoUpdateListener().subscribe((todos: Todo[]) =>{
      this.todos = todos;
    });
  }

}
