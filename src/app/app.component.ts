import { Component, OnInit } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  taskList: Task[] = []
  taskToEdit!: Task

  // constructor() {
  //   // new Date(2023, 4, 28).toLocaleDateString('en-US', {month: 'long', day: 'numeric'})
  //   const dummytask1: Task = {description: 'practise for assessment', priority: 'High', due: '2023-04-28', isCompleted: false}
  //   const dummytask2: Task = {description: 'swimming', priority: 'Medium', due: '2023-05-02', isCompleted: false}
  //   const dummytask3: Task = {description: 'Hiking', priority: 'Low', due: '2023-05-28', isCompleted: false}
    
  //   this.taskList.push(dummytask1, dummytask2, dummytask3)
  // }

  // send updated task list from parent to child component (attribute binding)
  addTaskToList(task: Task) {
    console.log('>>> task passed from child to parent & added to local storage: ', task)
    this.taskList.push(task)
    localStorage.setItem('tasks', JSON.stringify(this.taskList))
  }
  
  editTask(task: Task) {
    // push this to new-todo component for edit (parent to child - attribute binding)
    this.taskToEdit = task 
  }

  restorePrev() {
    const restored = localStorage.getItem('tasks')
    if (!restored)
      return
    const prev: Task[] = JSON.parse(restored)
    console.info('>>> restored tasks: ', prev)
    for (let i = 0; i < prev.length; i++) {
      this.taskList.push(prev[i])
    }
    
  }
}
