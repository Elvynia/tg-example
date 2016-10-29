import {Component, ViewChild, ChangeDetectionStrategy} from '@angular/core';

import {TrilliangularService, Trilliangular}  from '@trilliangular/core';
import {TgSceneComponent, TgObjectComponent, TgRendererThree}  from '@trilliangular/runtime-three';

import {ExampleCubeComponent} from './example-cube.component';

@Component({
	selector: 'tg-example',
	template: `
		<h1>Trilliangular example</h1>
		<canvas #canvas></canvas>
		<trilliangular width="600" height="400" debug="true" (started)="start($event)">
			<tg-renderer [renderTarget]="canvas"></tg-renderer>
			<tg-scene>
				<tg-actor id="ambientLight">
					<tg-instance [bound]="true" name="AmbientLight" [args]="[10526880, 2]" [visible]="lightVisible">
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
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TrilliangularService]
})
export class TgExampleComponent {
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

	private start(state: Trilliangular) {
		(<TgRendererThree> state.renderer).camera.position.z = 5;
	}
	
	private switchLight() {
		this.actorsActive = !this.actorsActive;
	}
	
	private logActorCount() {
		console.info('Current actor count : ' + this.scene.actors.length);
		console.info('Current object count : ' + this.scene.instance.children.length);
	}
}