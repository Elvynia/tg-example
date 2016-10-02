import {Component, ViewChild} from '@angular/core';

import {TgSceneComponent} from 'trilliangular/runtime/three/tg-scene.component';
import {TgObjectComponent} from 'trilliangular/runtime/three/tg-object.component';

import {ExampleCubeComponent} from './example-cube.component';

@Component({
	selector: 'example',
	template: `
		<h1>Trilliangular example</h1>
		<trilliangular width="600" height="400" debug="true" (started)="start($event)">
			<tg-renderer></tg-renderer>
			<tg-scene>
				<tg-actor id="ambientLight" [visible]="lightVisible">
					<tg-instance bound="true" name="AmbientLight" [args]="[10526880, 2]">
						<tg-keylistener keys="l" (keyUp)="switchLight($event)" [global]="globalBind" [scoped]="false"></tg-keylistener>
					</tg-instance>
				</tg-actor>
				<example-cube [active]="actorsActive"></example-cube>
			</tg-scene>
		</trilliangular>
		<div>
			Global bind active : <input type="checkbox" [(ngModel)]="globalBind" />
			Example cube actors active : <input type="checkbox" [(ngModel)]="actorsActive" />
			Light visible : <input type="checkbox" [(ngModel)]="lightVisible" />
		</div>
		<div id="sceneInfos">
			Current actors count : {{actorCount}}
			<button (click)="logActorCount()">Log actor count</button>
		</div>
	`
})
export class AppComponent {
	globalBind: boolean;
	actorsActive: boolean;
	lightVisible: boolean;
	actorCount: number;
	@ViewChild(TgSceneComponent)
	scene: TgSceneComponent;
	@ViewChild('greenCube')
	private greenCube: TgObjectComponent;
	@ViewChild('blueCube')
	private blueCube: TgObjectComponent;
	@ViewChild('redCube')
	private redCube: TgObjectComponent;

	constructor() {
		this.globalBind = true;
		this.actorsActive = true;
		this.lightVisible = true;
		this.actorCount = 0;
	}
	
	ngDoCheck() {
		if (this.scene.actors) {
			this.actorCount = this.scene.actors.length;
		}
	}

	private start(event) {
		event.target.renderer.camera.position.z = 5;
	}
	
	private switchLight() {
		this.actorsActive = !this.actorsActive;
	}
	
	private logActorCount() {
		console.info('Current actor count : ' + this.scene.actors.length);
		console.info('Current object count : ' + this.scene.instance.children.length);
	}
}