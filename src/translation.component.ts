import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { TrilliangularService } from '@trilliangular/core';
import { TgKeysComponent } from '@trilliangular/inputs';

@Component({
	selector: 'translation',
	template: `
		<tg-keylistener [keys]="keys[0]" global="true" (keyUp)="directions[0] = false" (keyDown)="directions[0] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[1]" global="true" (keyUp)="directions[1] = false" (keyDown)="directions[1] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[2]" global="true" (keyUp)="directions[2] = false" (keyDown)="directions[2] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[3]" global="true" (keyUp)="directions[3] = false" (keyDown)="directions[3] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[4]" global="true" (keyUp)="directions[4] = false" (keyDown)="directions[4] = true"></tg-keylistener>
		<tg-keylistener [keys]="keys[5]" global="true" (keyUp)="directions[5] = false" (keyDown)="directions[5] = true"></tg-keylistener>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationComponent {
	private directions: Array<boolean>;
	@Input() position: any;
	@Input() keys: Array<string>;
	@Output() positionChange: EventEmitter<any>;
	
	constructor(private appService: TrilliangularService) {
		this.directions = [false, false, false, false];
		this.keys = ['up', 'right', 'down', 'left', 'pageup', 'pagedown'];
		this.positionChange = new EventEmitter<any>();
	}
	
	ngOnInit() {
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
			if (this.directions[4]) {
				this.position.z += delta / 1000;
			} else if (this.directions[5]) {
				this.position.z -= delta / 1000;
			}
		});
	}
}