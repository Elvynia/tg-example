import {Component, Input, ViewChild} from '@angular/core';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgSceneService} from 'trilliangular/core/tg-scene.service';
import {TgObjectComponent} from 'trilliangular/runtime/three/tg-object.component';

@Component({
	selector: 'example-cube',
	template: `
		<tg-actor id="cubeLeft" [active]="active" (started)="startCubeLeft($event)">
			<tg-object bound="true" name="Mesh" #blueCube>
				<tg-instance name="BoxGeometry" [args]="[1, 1, 1]"></tg-instance>
				<tg-instance name="MeshPhongMaterial" [args]="{ color: 16711680, specular: 39168, shininess: 30, shading: 1 }"></tg-instance>
			</tg-object>
		</tg-actor>
		<tg-actor id="cube" [active]="active" (updated)="rotateCube($event)" *ngIf="ifActor">
			<tg-object bound="true" name="Mesh" *ngIf="ifObject" #greenCube>
				<tg-instance name="BoxGeometry" [args]="[1, 1, 1]"></tg-instance>
				<tg-instance name="MeshPhongMaterial" [args]="materialArgs"></tg-instance>
				<div id="cubePosition" *ngIf="greenCubeControls">
					Cube position :<br>
					x -> <input type="number" [(ngModel)]="greenCube.instance.position.x">
					<translation [keys]="['z', 'd', 's', 'q', 'a', 'e']" [(position)]="greenCube.instance.position"></translation>
				</div>
			</tg-object>
		</tg-actor>
		<tg-actor id="cubeRight" [active]="active" (started)="startCubeRight($event)">
			<tg-object bound="true" name="Mesh" #redCube>
				<tg-instance name="BoxGeometry" [args]="[1, 1, 1]"></tg-instance>
				<tg-instance name="MeshPhongMaterial" [args]="{ color: 255, specular: 39168, shininess: 30, shading: 1 }"></tg-instance>
			</tg-object>
		</tg-actor>
		<div id="destroyTest">
			Actor in DOM <input type="checkbox" [(ngModel)]="ifActor">
			Object in DOM <input type="checkbox" [(ngModel)]="ifObject">
		</div>
	`
})
export class ExampleCubeComponent {
	@Input() active: boolean;
	private materialArgs: any;
	private ifActor: boolean;
	private ifObject: boolean;
	private greenCubeControls: boolean;
	@ViewChild('greenCube')
	private greenCube: TgObjectComponent;
	@ViewChild('blueCube')
	private blueCube: TgObjectComponent;
	@ViewChild('redCube')
	private redCube: TgObjectComponent;

	constructor(private appService: TrilliangularService, private sceneService: TgSceneService) {
		this.materialArgs = {
			color: 0x00ff00,
			specular: 0x009900,
			shininess: 30,
			shading: THREE.FlatShading
		};
		this.ifActor = true;
		this.ifObject = true;
		this.greenCubeControls = false;
	}

	ngDoCheck() {
		if (this.greenCube && this.greenCube.instance) {
			this.greenCubeControls = true;
		} else {
			this.greenCubeControls = false;
		}
	}
	
	private rotateCube(delta) {
		if (this.greenCube && this.greenCube.stateService.target.instance) {
			this.greenCube.instance.rotation.x += delta / 1000;
			this.greenCube.instance.rotation.y += delta / 1000;
		}
	}
	
	private startCubeRight(event) {
		this.redCube.instance.position.x = 2;
	}
	
	
	private startCubeLeft(event) {
		this.blueCube.instance.position.x = -2;
	}
}