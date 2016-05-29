import {Component} from '@angular/core';
import {TrilliangularComponent} from 'trilliangular/dist/app/trilliangular.component';
//import {TrilliangularComponent} from 'trilliangular';

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