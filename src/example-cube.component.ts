import {Component, ViewChild, ContentChild} from '@angular/core';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgObjectComponent} from 'trilliangular/core/tg-object.component';
import {UpdateActorEvent} from 'trilliangular/event/update-actor-event.class';

@Component({
	selector: 'example-cube',
	template: `
		<tg-actor bindScene (update)="rotateCube($event)" *ngIf="ifActor" #actor>
			<tg-object name="BoxGeometry" [args]="[1, 1, 1]" #geometry></tg-object>
			<tg-object name="MeshPhongMaterial" [args]="materialArgs" #material></tg-object>
			<tg-object bindActor name="Mesh" [args]="[geometry.instance, material.instance]" *ngIf="ifObject" #mesh>
				<div id="cubePosition" *ngIf="actor && actor.initialized && mesh">
					Cube position :<br>
					x -> <input type="number" [(ngModel)]="mesh.instance.position.x">
				</div>
			</tg-object>
		</tg-actor>
		<div id="destroyTest">
			Actor in DOM <input type="checkbox" [(ngModel)]="ifActor">
			Object in DOM <input type="checkbox" [(ngModel)]="ifObject">
		</div>
	`
})
export class ExampleCubeComponent {
	private materialArgs: any;
	@ViewChild('mesh')
	mesh: TgObjectComponent;
	private ifActor: boolean;
	private ifObject: boolean;

	constructor(private tgService: TrilliangularService) {
		this.materialArgs = {
			color: 0x00ff00,
			specular: 0x009900,
			shininess: 30,
			shading: THREE.FlatShading
		};
		this.ifActor = true;
		this.ifObject = true;
	}
	
	get instance() {
		return this.mesh.instance;
	}
	
	private rotateCube(event: UpdateActorEvent) {
		if (event.objects[0]) {
			event.objects[0].instance.rotation.x += event.delta / 1000;
			event.objects[0].instance.rotation.y += event.delta / 1000;
		}
	}
}