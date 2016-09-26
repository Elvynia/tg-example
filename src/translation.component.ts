import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/takeUntil';

import { TgKeyboardComponent } from 'trilliangular/core/tg-keyboard.component';
import { TrilliangularService } from 'trilliangular/app/trilliangular.service';

@Component({
	selector: 'translation',
	template: `
		<tg-keyboard [keys]="keys[0]" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keyboard>
		<tg-keyboard [keys]="keys[1]" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keyboard>
		<tg-keyboard [keys]="keys[2]" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keyboard>
		<tg-keyboard [keys]="keys[3]" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keyboard>
		<tg-keyboard [keys]="keys[4]" #forward></tg-keyboard>
		<tg-keyboard [keys]="keys[5]" #backward></tg-keyboard>
	`
})
export class TranslationComponent {
	private directions: Array<boolean>;
	@Input() position: any;
	@Input() keys: Array<string>;
	@Output() positionChange: EventEmitter<any>;
	@ViewChild('forward') forward: TgKeyboardComponent;
	@ViewChild('backward') backward: TgKeyboardComponent;
	
	constructor(private appService: TrilliangularService) {
		this.directions = [false, false, false, false];
		this.keys = ['up', 'right', 'down', 'left', 'pageup', 'pagedown'];
		this.positionChange = new EventEmitter<any>();
	}
	
	ngOnInit() {
		this.forward.keyDown.subscribe(() => {
			this.appService.updateEvent.takeUntil(this.forward.keyUp)
				.subscribe((updateEvent) => this.position.z += updateEvent.delta / 500);
		});
		this.backward.keyDown.subscribe(() => {
			this.appService.updateEvent.takeUntil(this.backward.keyUp)
				.subscribe((updateEvent) => this.position.z -= updateEvent.delta / 500);
		});
		// this.appService.updateEvent
			// .skipUntil(this.forward.keyDown)
			// .takeUntil(this.forward.keyUp)
			// //.switch()
			// .subscribe((updateEvent) => this.position.z += updateEvent.delta / 1000);
		// this.appService.updateEvent
			// .skipUntil(this.backward.keyDown)
			// .takeUntil(this.backward.keyUp)
			// .subscribe((updateEvent) => this.position.z -= updateEvent.delta / 1000);
		this.appService.updateEvent.subscribe((event) => {
			if (this.directions[0]) {
				this.position.y += event.delta / 1000;
			} else if (this.directions[2]) {
				this.position.y -= event.delta / 1000;
			}
			if (this.directions[1]) {
				this.position.x += event.delta / 1000;
			} else if (this.directions[3]) {
				this.position.x -= event.delta / 1000;
			}
		});
	}
}