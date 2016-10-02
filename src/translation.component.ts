import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { TgKeylistenerComponent } from 'trilliangular/inputs/tg-keylistener.component';
import { TrilliangularService } from 'trilliangular/app/trilliangular.service';

@Component({
	selector: 'translation',
	template: `
		<tg-keylistener [keys]="keys[0]" global="true" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[1]" global="true" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[2]" global="true" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[3]" global="true" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[4]" global="true" #forward></tg-keylistener>
		<tg-keylistener [keys]="keys[5]" global="true" #backward></tg-keylistener>
	`
})
export class TranslationComponent {
	private directions: Array<boolean>;
	@Input() position: any;
	@Input() keys: Array<string>;
	@Output() positionChange: EventEmitter<any>;
	@ViewChild('forward') forward: TgKeylistenerComponent;
	@ViewChild('backward') backward: TgKeylistenerComponent;
	
	constructor(private appService: TrilliangularService) {
		this.directions = [false, false, false, false];
		this.keys = ['up', 'right', 'down', 'left', 'pageup', 'pagedown'];
		this.positionChange = new EventEmitter<any>();
	}
	
	ngOnInit() {
		// this.forward.keyDown.subscribe(() => {
			// this.appService.updated.takeUntil(this.forward.keyUp)
				// .subscribe((updateEvent) => this.position.z += updateEvent.delta / 500);
		// });
		// this.backward.keyDown.subscribe(() => {
			// this.appService.updated.takeUntil(this.backward.keyUp)
				// .subscribe((updateEvent) => this.position.z -= updateEvent.delta / 500);
		// });
		this.appService.updated.subscribe((delta) => {
			if (this.directions[0]) {
				this.position.y += delta / 1000;
			} else if (this.directions[2]) {
				this.position.y -= delta / 1000;
			}
			if (this.directions[1]) {
				this.position.x += delta / 1000;
			} else if (this.directions[3]) {
				this.position.x -= delta / 1000;
			}
		});
	}
}