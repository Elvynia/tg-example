import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TrilliangularComponent}  from 'trilliangular/app/trilliangular.component';
import {TgRendererComponent} from 'trilliangular/core/tg-renderer.component';
import {TgCameraComponent} from 'trilliangular/core/tg-camera.component';
import {TgSceneComponent} from 'trilliangular/core/tg-scene.component';
import {TgActorComponent} from 'trilliangular/core/tg-actor.component';
import {TgKeylistenerComponent} from 'trilliangular/core/tg-keylistener.component';
import {TgThreeComponent} from 'trilliangular/core/tg-three.component';

import { AppComponent }  from './app.component';
import { ExampleCubeComponent }  from './example-cube.component';
import { TranslationComponent }  from './translation.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
	AppComponent,
	ExampleCubeComponent,
	TranslationComponent,
	TrilliangularComponent,
	TgRendererComponent,
	TgCameraComponent,
	TgSceneComponent,
	TgActorComponent,
	TgKeylistenerComponent,
	TgThreeComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}