import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TrilliangularModule}  from '@trilliangular/core';
import {TgInputsModule}  from '@trilliangular/inputs';
import {TgThreeModule} from '@trilliangular/runtime-three';

import { TgExampleComponent }  from './tg-example.component';
import { ExampleCubeComponent }  from './example-cube.component';
import { TranslationComponent }  from './translation.component';

@NgModule({
  imports:      [
	BrowserModule,
	FormsModule,
	TrilliangularModule,
	TgInputsModule,
	TgThreeModule
  ],
  declarations: [
	TgExampleComponent,
	ExampleCubeComponent,
	TranslationComponent
  ],
  bootstrap:    [ TgExampleComponent ]
})
export class TgExampleModule {

}