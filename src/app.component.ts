import {Component} from '@angular/core';
import {TrilliangularComponent} from 'trilliangular/app/trilliangular.component';

@Component({
	selector: 'example',
	template: `
		<div>lalala</div>
		<trilliangular-app></trilliangular-app>
	`,
	directives: [TrilliangularComponent]
})
export class AppComponent {
}