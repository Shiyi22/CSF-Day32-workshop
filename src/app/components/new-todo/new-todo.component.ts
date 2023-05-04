import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task } from 'src/app/models';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit, OnChanges {

  todoForm!: FormGroup;
  todoArray!: FormArray

  @Output() onAdd = new Subject<Task>(); 
  @Input() taskToEdit!: Task

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { this.todoForm = this.createForm() }

  ngOnChanges(changes: SimpleChanges): void {
    this.todoForm = this.createForm() 
  }

  createForm(): FormGroup {
    this.todoArray = this.fb.array([])
    return this.fb.group({
      description: this.fb.control<string>(this.taskToEdit? this.taskToEdit.description : '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>(this.taskToEdit? this.taskToEdit.priority : 'Low', [Validators.required]),
      due: this.fb.control<string>(this.taskToEdit? this.taskToEdit.due : '', [Validators.required]) // check for due date validity in another method 
  })}

  isFormInvalid(): boolean {
    const due = this.todoForm.get('due')?.value // ? to mention that var is optional / pre-check if var is present 
    if (!due)
      return true // invalid 
    const today = new Date() 
    const dueDate = new Date(due)
    return this.todoForm.invalid || (dueDate < today)
  }

  addTask() {
    // convert date string to desired MMM-dd
    // const dateString: string = this.todoForm.get('due')?.value  // 2023-04-28
    // const dateArray: string[] = dateString.split('-') // ['2023', '4', '28']
    // const date = new Date(Number.parseInt(dateArray[0]), Number.parseInt(dateArray[1]), Number.parseInt(dateArray[2])).toLocaleDateString('en-US', {month: 'long', day: 'numeric'})

    // convert form to Task 
    const task: Task = {
      description: this.todoForm.get('description')?.value,
      priority: this.todoForm.get('priority')?.value,
      due: this.todoForm.get('due')?.value,
      isCompleted: false
    }
    // send the task from this to Parent component (event binding)
    this.onAdd.next(task)
    this.todoForm.reset()
  }
}
