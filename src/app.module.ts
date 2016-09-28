import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TrilliangularModule}  from 'trilliangular/app/trilliangular.module';
import {TgThreeModule}  from 'trilliangular/runtime/three/tg-three.module';

import { AppComponent }  from './app.component';
import { ExampleCubeComponent }  from './example-cube.component';
import { TranslationComponent }  from './translation.component';

@NgModule({
  imports:      [
	BrowserModule,
	FormsModule,
	TrilliangularModule,
	TgThreeModule
  ],
  declarations: [
	AppComponent,
	ExampleCubeComponent,
	TranslationComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}