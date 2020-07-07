import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { Todo } from './../todo.model'
import * as TodoActions from './../../actions/todo.actions';

@Component({
  selector:'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  constructor(public todosService: TodosService, private store: Store<AppState>){}

  onAddTodo(form: NgForm){
    if(form.invalid){
      return;
    }
      this.todosService.addTodo(form.value.task);
      //this.store.dispatch(new TodoActions.AddTodo({id: 1, task: form.value.task, completed: false}));
      form.resetForm();
  }
}
