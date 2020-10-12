/*============================================
; Title:          home.component.ts
; Author:         Laurie Mailloux
; Date:           27 September 2020
; Description:    home page
;===========================================*/


import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/item.interface';
import { Employee } from '../../shared/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Item[];
  done: Item[];

 employee: Employee;

 empId:string;

 constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log(res);

      this.employee = res.data;
      console.log('Employee object')
      console.log(this.employee);
      
      }, err => {
      console.log(err);
    }, ()=> {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      
    })
  
      document.body.style.background = 'darkgrey';
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>){

    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('reorder the existing list of task items');

      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);

            console.log(`moved task item to new container`);

            this.updateTaskList(this.empId, this.todo, this.done);
      }
  }

private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
  this.taskService.updateTask(empId, todo, done).subscribe(res => {
    this.employee = res.data;
    }, err => {
      console.log(err)
    }, ()=> {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    }
    )
}
openCreateTaskDialog() {
const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
  disableClose: true
})
  dialogRef.afterClosed().subscribe(data => {
    if (data) {
      this.taskService.createTask(this.empId, data.text).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, ()=> {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
      )
    }

})
}

deleteTask(taskId: string) {
  if (taskId) { 
  console.log(`Task item: ${taskId} was deleted`);

  this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
    this.employee = res.data;
  }, err => {
    console.log(err);
  }, () => {
    this.todo = this.employee.todo;
    this.done = this.employee.done;
  });
}}
}