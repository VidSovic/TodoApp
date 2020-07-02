import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector:'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent{
  enteredValue='';
  @Output() todoCreated = new EventEmitter<Todo>();

  onAddTodo(form: NgForm){
    if(form.invalid){
      return;
    }
      const todo: Todo = {task: form.value.task};
      this.todoCreated.emit(todo);
  }
}
