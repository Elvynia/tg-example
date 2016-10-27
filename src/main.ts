import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { TgExampleModule } from './tg-example.module';

//enableProdMode();
platformBrowserDynamic().bootstrapModule(TgExampleModule);