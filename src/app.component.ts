import {Component, ViewChild} from '@angular/core';
import {TrilliangularComponent} from 'trilliangular/app/trilliangular.component';
import {TgActorComponent} from 'trilliangular/core/tg-actor.component';
import {TgRendererComponent} from 'trilliangular/core/tg-renderer.component';
import {TgCameraComponent} from 'trilliangular/core/tg-camera.component';
import {TgSceneComponent} from 'trilliangular/core/tg-scene.component';
import {TgKeyboardComponent} from 'trilliangular/core/tg-keyboard.component';
import {StartEvent} from 'trilliangular/event/start-event.class';
import {UpdateEvent} from 'trilliangular/event/update-event.class';

import {ExampleCubeComponent} from './example-cube.component';

@Component({
	selector: 'example',
	template: `
		<h1>Trilliangular example</h1>
		<trilliangular width="600" height="400" (start)="start($event)">
			<tg-renderer></tg-renderer>
			<tg-camera></tg-camera>
			<tg-scene #scene>
				<example-cube></example-cube>
				<tg-actor id="ambientLight" [active]="lightActive" [visible]="lightVisible" #actor>
					<tg-three bound="true" name="AmbientLight" [args]="[10526880, 2]" #object>
						<tg-keyboard keys="l" (keyUp)="switchLight($event)" [global]="globalBind" [scoped]="false"></tg-keyboard>
					</tg-three>
				</tg-actor>
			</tg-scene>
		</trilliangular>
		<div>
			Global bind active : <input type="checkbox" [(ngModel)]="globalBind" />
			Light active : <input type="checkbox" [(ngModel)]="lightActive" />
			Light visible : <input type="checkbox" [(ngModel)]="lightVisible" />
		</div>
		<div id="sceneInfos">
			Current actors count : {{actorCount}}
			<button (click)="logActorCount()">Log actor count</button>
		</div>
	`
})
export class AppComponent {
	globalBind: boolean = true;
	lightActive: boolean = true;
	lightVisible: boolean = true;
	scene: TgSceneComponent;
	actorCount: number;
	
	ngDoCheck() {
		if (this.scene && this.actorCount != this.scene.actors.length) {
			this.actorCount = this.scene.actors.length;
		}
	}

	private start(event: StartEvent) {
		event.renderer.setSize(event.width, event.height);
		event.camera.position.z = 5;
		this.scene = event.scene;
	}
	
	private switchLight(event) {
		this.lightActive = !this.lightActive;
	}
	
	private logActorCount() {
		console.info('Current actor count : ' + this.scene.actors.length);
		console.info('Current object count : ' + this.scene.instance.children.length);
	}
}