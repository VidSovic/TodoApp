import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../todos.service';

@Component({
  selector:'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  constructor(public todosService: TodosService){}

  onAddTodo(form: NgForm){
    if(form.invalid){
      return;
    }
      this.todosService.addTodo(form.value.task);
      form.resetForm();
  }
}
