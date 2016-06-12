import {Component, ViewChild} from '@angular/core';
import {AfterContentInit, AfterViewInit} from '@angular/core';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgObjectComponent} from 'trilliangular/core/tg-object.component';

@Component({
	selector: 'exemple-cube',
	template: `
		<tg-object name="BoxGeometry" [args]="[1, 1, 1]" #geometry></tg-object>
		<tg-object name="MeshBasicMaterial" [args]="{ color: cubeColor }" #material></tg-object>
	`,
	directives: [TgObjectComponent]
})
export class ExempleCubeComponent extends TgObjectComponent implements AfterContentInit, AfterViewInit {
	private cubeColor: number;
	@ViewChild('geometry')
	geometry: TgObjectComponent;
	@ViewChild('material')
	material: TgObjectComponent;

	constructor(private tgService: TrilliangularService) {
		super();
		this.cubeColor = 0x00ff00;
	}
	
	ngAfterContentInit() {
	}
	
	ngAfterViewInit() {
		this.instance = new THREE.Mesh(this.geometry.instance, this.material.instance);
		this.tgService.initializeEvent.subscribe(context => {
			context.camera.position.z = 5;
			context.scene.add(this.instance);
		});
	}
}