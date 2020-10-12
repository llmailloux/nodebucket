/*============================================
; Title:          employee.interface.ts
; Author:         Laurie Mailloux
; Date:           27 September 2020
; Description:    Employee Interface
;===========================================*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[]; 
}