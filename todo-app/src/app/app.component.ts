import { Component } from '@angular/core';
import {Todo} from './todos/todo.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  onTodoAdded(todo){
      this.todos.push(todo);
  }
}
