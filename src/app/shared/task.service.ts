/*============================================
; Title:          task.service.ts
; Author:         Laurie Mailloux
; Date:           27 September 2020
; Description:    Task Service
;===========================================*/


import { Injectable } from '@angular/core'; 
import { CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import{ Observable } from 'rxjs';
import { Item }from './item.interface';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor(private http: HttpClient) {

   }

/**findAllTasks
 * 
 */
findAllTasks(empId: string): Observable<any> {
  return this.http.get('/api/employees/' + empId + '/tasks')
}

 /**
  * createTask
  */

  /**
   * updateTasks
   */
updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
  return this.http.put('/api/employees/' + empId + '/tasks', {
    todo,
    done
  })
}
   /**deleteTasks
    * 
    */
}
