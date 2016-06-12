import {Component, ViewChild} from '@angular/core';
import {TrilliangularComponent} from 'trilliangular/app/trilliangular.component';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgObjectComponent} from 'trilliangular/core/tg-object.component';
import {TgRendererComponent} from 'trilliangular/core/tg-renderer.component';
import {TgCameraComponent} from 'trilliangular/core/tg-camera.component';
import {TgSceneComponent} from 'trilliangular/core/tg-scene.component';
import {InitializeEvent} from 'trilliangular/event/initialize-event.class';
import {UpdateEvent} from 'trilliangular/event/update-event.class';

import {ExempleCubeComponent} from './exemple-cube.component';

@Component({
	selector: 'example',
	template: `
		<h1>Trilliangular example</h1>
		<canvas #renderTarget></canvas>
		<trilliangular-app width="600" height="400" (initialize)="initialize($event)" (update)="update($event)">
			<tg-renderer name="WebGLRenderer" [args]="{canvas: renderTarget}"></tg-renderer>
			<tg-camera name="PerspectiveCamera" [args]="[45, 600 / 400, 1, 1000]"></tg-camera>
			<tg-scene type="THREE" name="Scene">
				<exemple-cube #cube></exemple-cube>
				<tg-object name="AmbientLight" [args]="10526880" #light></tg-object>
			</tg-scene>
		</trilliangular-app>
	`,
	directives: [TrilliangularComponent, TgRendererComponent, TgCameraComponent,
		TgSceneComponent, TgObjectComponent, ExempleCubeComponent]
})
export class AppComponent {
	@ViewChild('cube')
	private cube: ExempleCubeComponent;
	@ViewChild('light')
	private light: TgObjectComponent;

	private initialize(event: InitializeEvent) {
		event.renderer.setSize(event.width, event.height);
		event.camera.position.z = 5;
		event.scene.add(this.light.instance);
	}
	
	private update(event: UpdateEvent) {
		this.cube.instance.rotation.x += event.delta / 1000;
		this.cube.instance.rotation.y += event.delta / 1000;
	}
}