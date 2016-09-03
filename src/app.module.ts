import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {TrilliangularComponent}  from 'trilliangular/app/trilliangular.component';
import {TgRendererComponent} from 'trilliangular/core/tg-renderer.component';
import {TgCameraComponent} from 'trilliangular/core/tg-camera.component';
import {TgSceneComponent} from 'trilliangular/core/tg-scene.component';
import {TgObjectComponent} from 'trilliangular//core/tg-object.component';
import {TgActorComponent} from 'trilliangular/core/tg-actor.component';
import {TgKeyboardComponent} from 'trilliangular/core/tg-keyboard.component';

import { AppComponent }  from './app.component';
import { ExampleCubeComponent }  from './example-cube.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TrilliangularComponent, TgRendererComponent, TgCameraComponent,
		TgSceneComponent, TgObjectComponent, TgActorComponent, TgKeyboardComponent, ExampleCubeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}