import {Component, ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgObjectComponent} from 'trilliangular/core/tg-object.component';

@Component({
	selector: 'exemple-cube',
	template: `
		<tg-object name="Mesh" [args]="[geometry.instance, material.instance]" #mesh>
			<tg-object name="BoxGeometry" [args]="[1, 1, 1]" #geometry></tg-object>
			<tg-object name="MeshPhongMaterial" [args]="materialArgs" #material></tg-object>
		</tg-object>
	`,
	directives: [TgObjectComponent]
})
export class ExempleCubeComponent implements AfterViewInit {
	private materialArgs: any;
	@ViewChild('mesh')
	mesh: TgObjectComponent;

	constructor(private tgService: TrilliangularService) {
		this.materialArgs = {
			color: 0x00ff00,
			specular: 0x009900,
			shininess: 30,
			shading: THREE.FlatShading
		};
	}
	
	get instance() {
		return this.mesh.instance;
	}
	
	ngAfterViewInit() {
		this.tgService.initializeEvent.subscribe(event => {
			event.scene.add(this.mesh.instance);
		});
	}
}