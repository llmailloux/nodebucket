/*============================================
; Title:          main.ts.ts
; Author:         Professor R. Krasso
; Modified by:    Laurie Mailloux
; Date:           27 September 2020
; Description:    Main
;===========================================*/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
