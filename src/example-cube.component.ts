import {Component, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';

import {TrilliangularService, TgSceneService}  from '@trilliangular/core';
import {TgMouse, TgMouseService, MOUSE}  from '@trilliangular/inputs';
import {TgSceneComponent, TgObjectComponent}  from '@trilliangular/runtime-three';

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
		<translation *ngIf="selectedPosition" [keys]="['z', 'd', 's', 'q', 'a', 'e']" [(position)]="selectedPosition"></translation>
	`,
	providers: [TgMouseService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCubeComponent {
	@Input() active: boolean;
	private materialArgs: any;
	private ifActor: boolean;
	private ifObject: boolean;
	private greenCubeControls: boolean;
	private selectedPosition: any;
	@ViewChild('greenCube')
	private greenCube: TgObjectComponent;
	@ViewChild('blueCube')
	private blueCube: TgObjectComponent;
	@ViewChild('redCube')
	private redCube: TgObjectComponent;

	constructor(private appService: TrilliangularService, private sceneService: TgSceneService,
		private mouseService: TgMouseService, private cd: ChangeDetectorRef) {
		this.materialArgs = {
			color: 0x00ff00,
			specular: 0x009900,
			shininess: 30,
			shading: THREE.FlatShading
		};
		this.ifActor = true;
		this.ifObject = true;
		this.greenCubeControls = false;
		this.selectedPosition = null;
	}

	ngOnInit() {
		this.mouseService.initialize(document.getElementsByTagName("body")[0]);
		this.mouseService.eventsByType(MOUSE.CLICKED).subscribe((event:TgMouse) => this.selectCube(event.nativeEvent));
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

	private selectCube(event: MouseEvent) {
		let selection = this.mouseService.mouseSelect(event.clientX, event.clientY);
		if (selection.length > 0) {
			this.selectedPosition = selection[0].object.position;
			// Ajout de la detection du changement pour mettre à jour la position passée
			// en paramètre du TranslationComponent dans la template.
			this.cd.detectChanges();
		}
	}
}