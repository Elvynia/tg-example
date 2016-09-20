import {Component, ViewChild, ContentChild} from '@angular/core';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {UpdateActorEvent} from 'trilliangular/event/update-actor-event.class';
import {StartActorEvent} from 'trilliangular/event/start-actor-event.class';

@Component({
	selector: 'example-cube',
	template: `
		<tg-actor id="cube" (update)="rotateCube($event)" *ngIf="ifActor" #actor>
			<tg-actor id="cubeLeft" (start)="startCubeLeft($event)">
				<tg-three name="BoxGeometry" [args]="[1, 1, 1]" #geometry1></tg-three>
				<tg-three name="MeshPhongMaterial" [args]="{ color: 16711680, specular: 39168, shininess: 30, shading: 1 }" #material1></tg-three>
				<tg-three bound="true" name="Mesh" [args]="[geometry1.instance, material1.instance]"></tg-three>
			</tg-actor>
			<tg-three name="BoxGeometry" [args]="[1, 1, 1]" #geometry></tg-three>
			<tg-three name="MeshPhongMaterial" [args]="materialArgs" #material></tg-three>
			<tg-three bound="true" name="Mesh" [args]="[geometry.instance, material.instance]" *ngIf="ifObject" #mesh>
				<div id="cubePosition" *ngIf="mesh && mesh.instance">
					Cube position :<br>
					x -> <input type="number" [(ngModel)]="mesh.instance.position.x">
				</div>
			</tg-three>
			<tg-actor id="cubeRight" (start)="startCubeRight($event)">
				<tg-three name="BoxGeometry" [args]="[1, 1, 1]" #geometry2></tg-three>
				<tg-three name="MeshPhongMaterial" [args]="{ color: 255, specular: 39168, shininess: 30, shading: 1 }" #material2></tg-three>
				<tg-three bound="true" name="Mesh" [args]="[geometry2.instance, material2.instance]"></tg-three>
			</tg-actor>
		</tg-actor>
		<div id="destroyTest">
			Actor in DOM <input type="checkbox" [(ngModel)]="ifActor">
			Object in DOM <input type="checkbox" [(ngModel)]="ifObject">
		</div>
	`
})
export class ExampleCubeComponent {
	private materialArgs: any;
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
	
	private rotateCube(event: UpdateActorEvent) {
		let object = event.actor.objects[0];
		if (object) {
			object.instance.rotation.x += event.delta / 1000;
			object.instance.rotation.y += event.delta / 1000;
		}
	}
	
	private startCubeRight(event: StartActorEvent) {
		let object = event.actor.objects[0];
		if (object) {
			object.instance.position.x = 2;
		}
	}
	
	
	private startCubeLeft(event: StartActorEvent) {
		let object = event.actor.objects[0];
		if (object) {
			object.instance.position.x = -2;
		}
	}
}