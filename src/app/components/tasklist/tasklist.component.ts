import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {

  @Input() tasks: Task[] = []
  @Output() onEdit = new Subject<Task>(); 

  hideTask(index: number) {
    // update isCompleted for particular task 
    this.tasks[index].isCompleted = true;
    console.info('>>> updated task list: ', this.tasks)
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1)
  }

  // push codes up from this component to parent component for edit (event binding)
  editTask(index: number) {
    this.onEdit.next(this.tasks[index])
    this.tasks.splice(index, 1)
  }

}
