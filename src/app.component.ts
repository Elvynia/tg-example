import {Component, ViewChild} from '@angular/core';
import {TrilliangularComponent} from 'trilliangular/app/trilliangular.component';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {TgObjectComponent} from 'trilliangular/core/tg-object.component';
import {TgRendererComponent} from 'trilliangular/core/tg-renderer.component';
import {TgCameraComponent} from 'trilliangular/core/tg-camera.component';
import {TgSceneComponent} from 'trilliangular/core/tg-scene.component';

import {ExempleCubeComponent} from './exemple-cube.component';

@Component({
	selector: 'example',
	template: `
		<h1>Trilliangular example</h1>
		<canvas #renderTarget></canvas>
		<trilliangular-app width="600" height="400" (initialize)="initialize($event)">
			<tg-renderer name="WebGLRenderer" [args]="{canvas: renderTarget}">
			</tg-renderer>
			<tg-camera name="PerspectiveCamera" [args]="[45, 600 / 400, 1, 1000]">
			</tg-camera>
			<tg-scene type="THREE" name="Scene">
				<exemple-cube #cube></exemple-cube>
			</tg-scene>
		</trilliangular-app>
	`,
	directives: [TrilliangularComponent, TgRendererComponent, TgCameraComponent,
		TgSceneComponent, TgObjectComponent, ExempleCubeComponent]
})
export class AppComponent {
	@ViewChild('cube')
	private cube: ExempleCubeComponent;

	private initialize(context: any) {
		context.renderer.setSize(context.width, context.height);
		//context.scene.add(this.cube.cube.instance);
	}
}